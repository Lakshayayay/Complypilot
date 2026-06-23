import { DocumentStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateStatusDto {
  @IsNotEmpty()
  @IsEnum(DocumentStatus)
  status: DocumentStatus;
}
