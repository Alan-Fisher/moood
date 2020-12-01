import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserDTO, LoginUserDTO, CreateUserDTO } from './user.dto'
import { User } from '../user/user.entity'
import { toUserDTO } from '../shared/mapper'
import { comparePasswords } from '../shared/utils'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) { }

  async findOne(options?: Record<string, unknown>): Promise<UserDTO> {
    const user = await this.repo.findOne(options)
    return toUserDTO(user)
  }

  async findByLogin({ email, password }: LoginUserDTO): Promise<UserDTO> {
    const user = await this.repo.findOne({ where: { email } })

    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    const areEqual = await comparePasswords(user.password, password)

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
    }

    return toUserDTO(user)
  }

  async findByPayload({ email }: any): Promise<UserDTO> {
    return await this.findOne({ where: { email } })
  }

  async create(userDto: CreateUserDTO): Promise<UserDTO> {
    const { username, password, email } = userDto

    const userInDb = await this.repo.findOne({ where: { email } })
    if (userInDb) {
      throw new HttpException('Email is already registred', HttpStatus.BAD_REQUEST)
    }

    const user: User = await this.repo.create({ username, password, email, })
    await this.repo.save(user)
    return toUserDTO(user)
  }
}

