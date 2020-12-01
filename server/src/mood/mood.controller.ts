/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { Controller, Get, Post, Delete, Body, ValidationPipe, Param, UseGuards, Req } from '@nestjs/common'
import { MoodService } from './mood.service'
import { MoodDTO, MoodRO } from './mood.dto'
import { AuthGuard } from '@nestjs/passport'
import { UserDTO } from '../user/user.dto'

@Controller('moods')
export class MoodController {
  constructor(private serv: MoodService) { }

  @Get()
  @UseGuards(AuthGuard())
  public async getAll(@Req() req: any): Promise<MoodRO[]> {
    const user = req.user as UserDTO

    return await this.serv.getAll(user)
  }

  @Post()
  @UseGuards(AuthGuard())
  public async post(
    @Body(new ValidationPipe({ transform: true })) dto: MoodDTO,
    @Req() req: any, // TODO: use decorator
  ): Promise<MoodDTO> {
    const user = req.user as UserDTO

    return this.serv.create(MoodDTO.from(dto), user)
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
}
