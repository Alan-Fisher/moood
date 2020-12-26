/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { Controller, Get, Post, Delete, Body, ValidationPipe, Param, UseGuards, Req } from '@nestjs/common'
import { TagCategoryService } from './tagCategory.service'
import { TagCategoryDTO, TagCategoryRO } from './tagCategory.dto'
import { AuthGuard } from '@nestjs/passport'
import { UserDTO } from '../user/user.dto'

@Controller('tags/categories')
export class TagCategoryController {
  constructor(private serv: TagCategoryService) { }

  @Get()
  @UseGuards(AuthGuard())
  public async getAll(@Req() req: any): Promise<TagCategoryRO[]> {
    const user = req.user as UserDTO

    return await this.serv.getAll(user)
  }

  @Post()
  @UseGuards(AuthGuard())
  public async post(
    @Body(new ValidationPipe({ transform: true })) dto: TagCategoryDTO,
    @Req() req: any,
  ) {
    const user = req.user as UserDTO

    return this.serv.create(TagCategoryDTO.from(dto), user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public async delete(
    @Param('id') id: number,
    @Req() req: any,
  ) {
    const user = req.user as UserDTO

    return this.serv.archive(id, user)
  }
}
