import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional, } from 'class-validator'
import { Tag } from './tag.entity'

export class TagDTO implements Readonly<TagDTO> {
  @ApiProperty({ required: false })
  @IsOptional() // Q: is it okay?
  @IsNumber()
  id: number

  @ApiProperty({ required: false }) // Q is { required: false }okay?
  @IsString()
  emoji: string

  @ApiProperty({ required: false })
  @IsString()
  name: string

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  state: string

  public static from(dto: Partial<TagDTO>): TagDTO {
    const it = new TagDTO()
    it.id = dto.id
    it.emoji = dto.emoji
    it.name = dto.name
    it.state = dto.state

    return it
  }

  public static fromEntity(entity: Tag): TagDTO {
    return this.from({
      id: entity.id,
      emoji: entity.emoji,
      name: entity.name,
      state: entity.state,
    })
  }

  public toEntity() {
    const it = new Tag()
    it.id = this.id 
    it.emoji = this.emoji
    it.name = this.name
    it.state = this.state
    
    return it
  }
}

export class TagRO {
  id: number
  name: string
  emoji: string
  state: string
}

export class UpdateTagDTO {
  name: string
  emoji: string
}