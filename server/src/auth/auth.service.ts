import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { RegistrationStatus } from './interfaces/regisration-status.interface'
import { UserService } from '../user/user.service'
import { LoginStatus } from './interfaces/login-status.interface'
import { LoginUserDTO, UserDTO, CreateUserDTO } from '../user/user.dto'
import { JwtPayload } from './interfaces/payload.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async register(userDto: CreateUserDTO): Promise<RegistrationStatus> {
    let status: RegistrationStatus = { // TODO: maybe change to 201 / 4XX code?)))
      success: true,
      message: 'user registered',
    }

    try {
      await this.userService.create(userDto)
    } catch (err) {
      status = {
        success: false,
        message: err,
      }
    }

    return status
  }

  async login(loginUserDto: LoginUserDTO): Promise<LoginStatus> {
    const user = await this.userService.findByLogin(loginUserDto)

    const token = this.createToken(user)

    return {
      email: user.email,
      ...token,
    }
  }

  private createToken({ email }: UserDTO): any {
    const user: JwtPayload = { email }
    const accessToken = this.jwtService.sign(user)
    return {
      // expiresIn: process.env.EXPIRESIN,
      accessToken,
    }
  }

  async validateUser(payload: JwtPayload): Promise<UserDTO> {
    const user = await this.userService.findByPayload(payload)
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}