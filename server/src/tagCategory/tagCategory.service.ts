import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TagCategory } from '../tagCategory/tagCategory.entity'
import { Repository } from 'typeorm'
import { TagCategoryDTO, TagCategoryRO } from './tagCategory.dto'
import { UserService } from '../user/user.service'
import { UserDTO } from '../user/user.dto'

@Injectable()
export class TagCategoryService {
  constructor(
    @InjectRepository(TagCategory) private readonly repo: Repository<TagCategory>,
    private readonly userService: UserService,
  ) { }

  public async getAll({ id }: UserDTO): Promise<TagCategoryRO[]> {
    const tagCategories = await this.repo.createQueryBuilder('category')
      .leftJoinAndSelect("category.tags", "tags", `tags.state != 'archive' AND tags.owner.id = ${id}`)
      .where(`category.isArchived = FALSE AND category.owner.id = ${id}`)
      .orderBy({
        'category.name': 'ASC',
        'tags.name': 'ASC'
      })
      .getMany()

    return tagCategories
  }

  public async create(dto: TagCategoryDTO, { id }: UserDTO): Promise<TagCategoryDTO> {
    const owner = await this.userService.findOne({ where: { id } })

    const tagCategory = {
      ...dto.toEntity(),
      owner
    }
    return this.repo.save(tagCategory)
      .then(e => TagCategoryDTO.fromEntity(e))
  }

  public async archive(id: number, { id: userId }: UserDTO): Promise<string> {
    const tagCategory = await this.repo.findOne({ where: { id, owner: { id: userId } } })
    if (!tagCategory) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    tagCategory.isArchived = true

    return this.repo.update({ id }, tagCategory)
      .then(() => `${id} tagCategory is archived`)
  }
}

