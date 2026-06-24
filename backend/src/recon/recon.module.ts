import { Module } from '@nestjs/common';
import { ReconService } from './recon.service';
import { ReconController } from './recon.controller';

@Module({
  controllers: [ReconController],
  providers: [ReconService],
  exports: [ReconService],
})
export class ReconModule {}
