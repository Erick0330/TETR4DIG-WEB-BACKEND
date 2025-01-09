import { Module } from '@nestjs/common';
import { DimensionService } from './dimension.service';
import { DimensionController } from './dimension.controller';

@Module({
  controllers: [DimensionController],
  providers: [DimensionService],
})
export class DimensionModule {}
