import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import { TagCategory } from '../tagCategory/tagCategory.entity'
import { Mood } from '../mood/mood.entity'
import { User } from '../user/user.entity'


@Entity({ name: 'tag' })
export class Tag extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: true })
  name: string

  @Column({ type: 'varchar', length: 300, nullable: true })
  emoji: string

  @Column({ default: 'active' })
  state: string;

  @ManyToOne(() => TagCategory, (category: TagCategory) => category.tags)
  category: TagCategory

  @ManyToMany(() => Mood)
  moods: Mood[]

  @ManyToOne(() => User)
  owner: User
}