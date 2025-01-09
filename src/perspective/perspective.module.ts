import { Module } from '@nestjs/common';
import { PerspectiveService } from './perspective.service';
import { PerspectiveController } from './perspective.controller';

@Module({
  controllers: [PerspectiveController],
  providers: [PerspectiveService],
})
export class PerspectiveModule {}
