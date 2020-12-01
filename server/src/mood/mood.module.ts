import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoodService } from './mood.service'
import { MoodController } from './mood.controller'
import { Mood } from './mood.entity'
import { Tag } from '../tag/tag.entity'
import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([Mood, Tag])],
  providers: [MoodService],
  controllers: [MoodController],
  exports: []
})

export class MoodModule { }