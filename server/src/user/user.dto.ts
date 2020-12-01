import { IsNotEmpty, IsEmail, } from 'class-validator'

export class CreateUserDTO {  
  @IsNotEmpty()  
  username: string

  @IsNotEmpty()  
  password: string

  @IsNotEmpty()  
  @IsEmail()  
  email: string
}

export class UserDTO {  
  @IsNotEmpty()  
  id: number

  @IsNotEmpty()  
  username: string

  @IsNotEmpty()  
  @IsEmail()  
  email: string
}

export class LoginUserDTO {  
  @IsNotEmpty()  
  readonly email: string
  
  @IsNotEmpty()  
  readonly password: string
}