import { IsString, IsNotEmpty, IsArray, ValidateNested, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceRecordDto {
  @IsString()
  @IsNotEmpty()
  gstin: string; // Vendor GSTIN

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsNumber()
  igst: number;

  @IsNumber()
  cgst: number;

  @IsNumber()
  sgst: number;

  @IsString()
  @IsOptional()
  vendorName?: string;

  @IsString()
  @IsOptional()
  invoiceDate?: string;
}

export class ReconcileDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;

  // Optional: link discrepancies to a specific deadline for "Flag to Client" action
  @IsString()
  @IsOptional()
  deadlineId?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceRecordDto)
  internalPurchases: InvoiceRecordDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InvoiceRecordDto)
  gstr2bData: InvoiceRecordDto[];
}
