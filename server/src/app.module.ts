import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { configService } from './config/config.service'
import { MoodModule } from './mood/mood.module'
import { TagModule } from './tag/tag.module'
import { TagCategoryModule } from './tagCategory/tagCategory.module'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { ABModule } from './ab/ab.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    MoodModule,
    TagModule,
    TagCategoryModule,
    UserModule,
    AuthModule,
    ABModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }