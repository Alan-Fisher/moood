import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional, IsDate, IsArray, } from 'class-validator'
import { Mood } from './mood.entity'
import { Type } from "class-transformer"
import { Tag } from '../tag/tag.entity'

export class MoodDTO implements Readonly<MoodDTO> {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id: number

  @ApiProperty({ required: true })
  @IsNumber()
  moodLevel: number

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  note: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  feelingIds: Array<number>

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  tagIds: Array<number>

  @Type(() => Date)
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  createDateTime: Date

  public static from(dto: Partial<MoodDTO>) {
    const it = new MoodDTO()
    it.id = dto.id
    it.moodLevel = dto.moodLevel
    it.feelingIds = dto.feelingIds
    it.tagIds = dto.tagIds
    it.note = dto.note
    it.createDateTime = dto.createDateTime
    return it
  }

  public static fromEntity(entity: Mood) {
    return this.from({
      id: entity.id,
      moodLevel: entity.moodLevel,
      feelingIds: entity.feelingIds,
      note: entity.note,
      createDateTime: entity.createDateTime,
    })
  }

  public toEntity() {
    const it = new Mood()
    it.id = this.id
    it.moodLevel = this.moodLevel
    it.feelingIds = this.feelingIds
    it.note = this.note
    it.createDateTime = this.createDateTime || new Date()
    return it
  }
}

export class MoodRO {
  id: number
  moodLevel: number
  feelingIds: Array<number>
  tags: Tag[]
  note: string
  createDateTime: Date
}