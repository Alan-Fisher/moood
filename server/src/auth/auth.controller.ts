import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { CreateUserDTO, LoginUserDTO } from '../user/user.dto'
import { RegistrationStatus } from './interfaces/regisration-status.interface'
import { AuthService } from './auth.service'
import { LoginStatus } from './interfaces/login-status.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDTO): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(createUserDto)

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
    }

    return result
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDTO): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto)
  }
}
