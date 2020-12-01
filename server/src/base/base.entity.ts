import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  createDateTime: Date
}