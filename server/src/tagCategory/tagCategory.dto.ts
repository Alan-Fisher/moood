import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNumber, IsOptional, } from 'class-validator'
import { TagCategory } from './tagCategory.entity'

export class TagCategoryDTO implements Readonly<TagCategoryDTO> {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  id: number

  @ApiProperty({ required: false })
  @IsString()
  name: string

  public static from(dto: Partial<TagCategoryDTO>) {
    const it = new TagCategoryDTO()
    it.id = dto.id
    it.name = dto.name

    return it
  }

  public static fromEntity(entity: TagCategory) {
    return this.from({
      id: entity.id,
      name: entity.name,
    })
  }

  public toEntity() {
    const it = new TagCategory()
    it.id = this.id 
    it.name = this.name
    
    return it
  }
}

export class TagCategoryRO {
  id: number
  name: string
}