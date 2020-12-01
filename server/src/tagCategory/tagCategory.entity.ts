import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import {Tag} from '../tag/tag.entity'
import { User } from '../user/user.entity'


@Entity({ name: 'tagCategory' })
export class TagCategory extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: true })
  name: string
  
  @Column({ default: false })
  isArchived: boolean

  @OneToMany(() => Tag, (tag: Tag) => tag.category)
  tags: Tag[]

  @ManyToOne(() => User)
  owner?: User
}