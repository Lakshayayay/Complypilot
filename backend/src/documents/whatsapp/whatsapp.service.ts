import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WhatsappService {
  private readonly logger = new Logger(WhatsappService.name);

  /**
   * Mocks sending a WhatsApp message via Meta Cloud API.
   * If real credentials were provided, this would use axios to POST to the WhatsApp API.
   */
  async dispatchDropZoneLink(phoneNumber: string, docType: string, token: string, baseUrl: string) {
    const dropLink = `${baseUrl}/drop/${token}`;
    
    const message = `Hi, your CA requested a document: ${docType}. Please upload it securely here: ${dropLink}`;

    // For local development, we just log the mocked message and the link.
    // In production, this would be an Axios call to Meta Cloud API:
    // await axios.post(`https://graph.facebook.com/v17.0/.../messages`, { ... }, { headers: { Authorization: ... }});

    this.logger.log(`================ MOCK WHATSAPP DISPATCH ================`);
    this.logger.log(`To: ${phoneNumber}`);
    this.logger.log(`Message: ${message}`);
    this.logger.log(`Drop Link: ${dropLink}`);
    this.logger.log(`========================================================`);

    return { success: true, messageId: 'mock-id-1234' };
  }
}
