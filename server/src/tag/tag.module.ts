import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { Tag } from './tag.entity'
import { TagCategory } from '../tagCategory/tagCategory.entity'
import { AuthModule } from '../auth/auth.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([Tag, TagCategory])],
  providers: [TagService],
  controllers: [TagController],
  exports: []
})

export class TagModule { }