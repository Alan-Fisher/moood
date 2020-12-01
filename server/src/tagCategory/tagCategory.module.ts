import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TagCategoryService } from './tagCategory.service'
import { TagCategoryController } from './tagCategory.controller'
import { TagCategory } from './tagCategory.entity'
import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [UserModule, AuthModule, TypeOrmModule.forFeature([TagCategory])],
  providers: [TagCategoryService],
  controllers: [TagCategoryController],
  exports: []
})

export class TagCategoryModule { }