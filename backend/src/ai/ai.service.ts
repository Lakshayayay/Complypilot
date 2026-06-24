import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

export interface AiSummaryResult {
  summary: string;
  deadline: string | null; // ISO date string YYYY-MM-DD or null
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly genAI: GoogleGenerativeAI;

  // Strictly constrained system instruction — the model CANNOT deviate from this role
  private readonly SYSTEM_INSTRUCTION = `You are a compliance assistant for Indian MSMEs. 
Your ONLY job is to read regulatory text and extract structured information. 
You are NOT a legal advisor. You do NOT give legal opinions or recommendations beyond what is explicitly stated in the text.
Rules you must follow:
1. Summarize the document in exactly 3 simple sentences. Sentence 1: What happened or what this notice is about. Sentence 2: The deadline or time constraint mentioned. Sentence 3: The required action the business must take.
2. Extract the deadline date in YYYY-MM-DD format if one is explicitly stated. If no specific date is mentioned, return null.
3. Classify severity as HIGH (penalty/shutdown/prosecution risk), MEDIUM (filing required, financial impact), or LOW (informational/advisory only).
4. Do not add any text, advice, opinions, or information not present in the source document.`;

  // Enforce JSON schema so the model CANNOT return free-form text
  private readonly RESPONSE_SCHEMA = {
    type: SchemaType.OBJECT,
    properties: {
      summary: {
        type: SchemaType.STRING,
        description: 'Exactly 3 sentences summarizing the notice.',
      },
      deadline: {
        type: SchemaType.STRING,
        description: 'Deadline date in YYYY-MM-DD format, or the string "null" if no date is specified.',
        nullable: true,
      },
      severity: {
        type: SchemaType.STRING,
        enum: ['HIGH', 'MEDIUM', 'LOW'],
        description: 'Risk severity classification.',
      },
    },
    required: ['summary', 'deadline', 'severity'],
  };

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      this.logger.warn('GEMINI_API_KEY is not set. AI summarization will fail at runtime.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey || '');
  }

  async summarizeNotice(noticeText: string): Promise<AiSummaryResult> {
    try {
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: this.SYSTEM_INSTRUCTION,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: this.RESPONSE_SCHEMA as any,
          temperature: 0.1, // Very low temperature for deterministic, factual parsing
          maxOutputTokens: 512, // Hard limit — summary must be short
        },
      });

      const prompt = `Read the following regulatory document and return the structured JSON response as instructed:\n\n---\n${noticeText}\n---`;

      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      let parsed: AiSummaryResult;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        this.logger.error('Gemini returned non-JSON response', responseText);
        throw new InternalServerErrorException('AI returned an unexpected response format.');
      }

      // Normalize "null" string to actual null
      if (parsed.deadline === 'null' || parsed.deadline === '') {
        parsed.deadline = null;
      }

      // Validate severity is one of the expected values
      if (!['HIGH', 'MEDIUM', 'LOW'].includes(parsed.severity)) {
        parsed.severity = 'MEDIUM';
      }

      return parsed;
    } catch (err) {
      this.logger.error('Gemini API call failed', err);
      throw new InternalServerErrorException('Failed to process document with AI service. Please try again.');
    }
  }
}
