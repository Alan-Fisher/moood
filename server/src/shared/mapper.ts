import { User } from '../user/user.entity'
import { UserDTO } from '../user/user.dto'

export const toUserDTO = (data: User): UserDTO => {  
  const { id, username, email } = data

  const user: UserDTO = { id, username, email,  }

  return user
}