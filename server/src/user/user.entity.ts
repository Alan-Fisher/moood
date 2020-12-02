import { Entity, Column, BeforeInsert, } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import * as bcrypt from 'bcrypt'

@Entity('user')
export class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true
  })
  email: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }
}