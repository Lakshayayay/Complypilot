import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ComplianceModule } from '../compliance/compliance.module';

@Module({
  imports: [PrismaModule, ComplianceModule],
  controllers: [ClientsController],
})
export class ClientsModule {}
