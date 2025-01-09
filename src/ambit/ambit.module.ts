import { Module } from '@nestjs/common';
import { AmbitService } from './ambit.service';
import { AmbitController } from './ambit.controller';

@Module({
  controllers: [AmbitController],
  providers: [AmbitService],
})
export class AmbitModule {}
