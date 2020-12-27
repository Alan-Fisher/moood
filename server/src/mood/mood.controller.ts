/* eslint-disable @typescript-eslint/explicit-module-boundary-types*/
import { Controller, Get, Patch, Post, Delete, Body, ValidationPipe, Param, UseGuards, Req } from '@nestjs/common'
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

  @Get(':id')
  @UseGuards(AuthGuard())
  public async show(
    @Param('id') id: number,
    @Req() req: any,
  ): Promise<MoodRO> {
    const user = req.user as UserDTO

    return await this.serv.show(id, user)
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

  @Patch(':id')
  @UseGuards(AuthGuard())
  public async update(
    @Param('id') id: number,
    @Body(new ValidationPipe({ transform: true })) dto: MoodDTO,
    @Req() req: any, // TODO: use decorator
  ): Promise<string> {
    const user = req.user as UserDTO

    return this.serv.update(id, MoodDTO.from(dto), user)
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
