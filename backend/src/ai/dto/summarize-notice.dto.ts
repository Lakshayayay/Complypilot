import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class SummarizeNoticeDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50000)
  noticeText: string;
}
