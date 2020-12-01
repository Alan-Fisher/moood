import { Entity, Column, BeforeInsert, } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import * as bcrypt from 'bcrypt'

@Entity('user')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}