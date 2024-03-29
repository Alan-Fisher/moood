import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm'
import { BaseEntity } from '../base/base.entity'
import { Tag } from '../tag/tag.entity'
import { User } from '../user/user.entity'

@Entity({ name: 'mood' })
export class Mood extends BaseEntity {

  @Column({ type: "float" })
  moodLevel: number

  @Column("int", { array: true, nullable: true })
  feelingIds: number[]

  @Column({ type: 'varchar', length: 10000, nullable: true })
  note: string

  @Column({ default: false })
  isArchived: boolean

  @ManyToMany(() => Tag) // Q okay without  (tag: Tag) => tag.moods, { cascade: true } ?
  @JoinTable() // Q do I need this?
  tags: Tag[]

  @ManyToOne(() => User)
  owner?: User
}