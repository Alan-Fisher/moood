/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { Controller, Get, Post, Delete, Body, ValidationPipe, Param, UseGuards, Req, Patch } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagDTO, TagRO, UpdateTagDTO } from './tag.dto'
import { AuthGuard } from '@nestjs/passport'
import { UserDTO } from '../user/user.dto'

@Controller('tags')
export class TagController {
  constructor(private serv: TagService) { }

  @Get('favorites')
  @UseGuards(AuthGuard())
  public async getFavorites(@Req() req: any): Promise<TagRO[]> { // TODO: rename to show that it's for quick select
    const user = req.user as UserDTO

    return await this.serv.getFavorites(user)
  }

  @Post('categories/:id')
  @UseGuards(AuthGuard())
  public async post(
    @Param('id') tagCategory: string,
    @Body(new ValidationPipe({ transform: true })) dto: TagDTO,
    @Req() req: any,
  ): Promise<TagDTO> {
    const user = req.user as UserDTO

    return this.serv.create(tagCategory, TagDTO.from(dto), user)
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  public async patch(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true })) dto: UpdateTagDTO,
    @Req() req: any,
  ): Promise<string> {
    const user = req.user as UserDTO

    return this.serv.update(id, TagDTO.from(dto), user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  public async archive(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<string> {
    const user = req.user as UserDTO

    return this.serv.archive(id, user)
  }

  @Post(':id/favorite')
  @UseGuards(AuthGuard())
  public async favorite(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<string> {
    const user = req.user as UserDTO

    return this.serv.favorite(id, user)
  }

  @Post(':id/half-favorite')
  @UseGuards(AuthGuard())
  public async halfFavorite(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<string> {
    const user = req.user as UserDTO

    return this.serv.halfFavorite(id, user)
  }

  @Post(':id/unfavorite')
  @UseGuards(AuthGuard())
  public async unfavorite(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<string> {
    const user = req.user as UserDTO

    return this.serv.unfavorite(id, user)
  }
}
