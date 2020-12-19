import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Tag } from '../tag/tag.entity'
import { Repository } from 'typeorm'
import { TagDTO, TagRO, UpdateTagDTO } from './tag.dto'
import { TagCategory } from '../tagCategory/tagCategory.entity'
import { UserDTO } from '../user/user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag) private readonly repo: Repository<Tag>,
    @InjectRepository(TagCategory) private tagCategoryRepository: Repository<TagCategory>,
    private readonly userService: UserService,
  ) { }

  public async getFavorites({ id }: UserDTO): Promise<TagRO[]> {
    const favoriteTags = await this.repo.find({
      where: {
        owner: { id },
        state: 'favorite',
      },
      order: { name: 'ASC' }
    })
    const halfFavoriteTags = await this.repo.find({
      where: {
        state: 'half-favorite',
        owner: { id },
      },
      order: { name: 'ASC' }
    })

    return [...favoriteTags, ...halfFavoriteTags]
  }

  public async create(tagCategoryId: string, dto: TagDTO, { id }: UserDTO): Promise<TagDTO> {
    const owner = await this.userService.findOne({ where: { id } })
    const tagCategory = await this.tagCategoryRepository.findOne({ where: { id: tagCategoryId, owner: { id } } })

    if (!tagCategory) { throw new HttpException('Not found', HttpStatus.NOT_FOUND) } // Q okay exptn? Mention ctgry

    const tag = {
      ...dto.toEntity(),
      category: tagCategory,
      owner,
    }

    return this.repo.save(tag)
      .then(e => TagDTO.fromEntity(e))
  }

  public async update(id: number, dto: UpdateTagDTO, { id: userId }: UserDTO): Promise<any> {
    const tag = await this.repo.findOne({ where: { id, owner: { id: userId } } })
    if (!tag) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
  
    tag.emoji = dto.emoji // TODO: make update more beautiful?
    tag.name = dto.name

    return this.repo.update({ id }, tag)
      .then(() => `${id} tag is updated`)
  }

  public async archive(id: number, { id: userId }: UserDTO): Promise<string> {
    const tag = await this.repo.findOne({ where: { id, owner: { id: userId } } })
    if (!tag) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    tag.state = 'archive'

    return this.repo.update({ id }, tag)
      .then(() => `${id} tag is archived`)
  }

  public async favorite(id: number, { id: userId }: UserDTO): Promise<string> {
    const tag = await this.repo.findOne({ where: { id, owner: { id: userId } } })
    if (!tag) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    tag.state = 'favorite'

    return this.repo.update({ id }, tag)
      .then(() => `${id} tag is favorite`)
  }

  public async halfFavorite(id: number, { id: userId }: UserDTO): Promise<string> {
    const tag = await this.repo.findOne({ where: { id, owner: { id: userId } } })
    if (!tag) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    tag.state = 'half-favorite'

    return this.repo.update({ id }, tag)
      .then(() => `${id} tag is half-favorite`)
  }

  public async unfavorite(id: number, { id: userId }: UserDTO): Promise<string> {
    const tag = await this.repo.findOne({ where: { id, owner: { id: userId } } })
    if (!tag) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    tag.state = 'active'

    return this.repo.update({ id }, tag)
      .then(() => `${id} tag is unfavorited`)
  }
}

