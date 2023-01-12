import { Module } from '@nestjs/common'
import { ABService } from './ab.service-new'
import { ABController } from './ab.controller'

@Module({
  imports: [],
  controllers: [ABController],
  providers: [ABService],
  exports: [],
})
export class ABModule { }