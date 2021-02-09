import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Mood } from './mood.entity'
import { Repository } from 'typeorm'
import { MoodDTO, MoodRO } from './mood.dto'
import { Tag } from '../tag/tag.entity'
import { UserDTO } from '../user/user.dto'
import { UserService } from '../user/user.service'

@Injectable()
export class MoodService {
  constructor(
    @InjectRepository(Mood) private readonly repo: Repository<Mood>,
    @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
    private readonly userService: UserService,
  ) { }

  public async getAll({ id }: UserDTO, take: number, skip: number): Promise<MoodRO[]> {
    console.log({
      // where: { owner: { id }, isArchived: false },
      // relations: ['tags'],
      // order: { createDateTime: 'DESC' },
      take,
      skip,
    })
    const moods = await this.repo.find({
      where: { owner: { id }, isArchived: false },
      relations: ['tags'],
      order: { createDateTime: 'DESC' },
      take,
      skip,
    })

    return moods
  }

  public async show(id: number, { id: userId }: UserDTO): Promise<MoodRO> {
    const mood = await this.repo.findOne({
      where: { id, owner: { id: userId } },
      relations: ['tags']
    })

    return mood
  }

  public async create(dto: MoodDTO, { id }: UserDTO): Promise<MoodRO> {
    const owner = await this.userService.findOne({ where: { id } })
    const tags = await this.tagsRepository.findByIds(dto.tagIds)
    const mood = {
      ...dto.toEntity(),
      tags,
      owner,
    }

    return this.repo.save(mood)
      .then(e => MoodRO.fromEntity(e))
  }

  public async update(id: number, dto: MoodDTO, { id: userId }: UserDTO): Promise<MoodRO> {
    const mood = await this.repo.findOne({ where: { id, owner: { id: userId } } })

    if (!mood) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    const { note, tagIds, feelingIds, createDateTime, moodLevel } = dto // eslint-disable-line
    const tags = await this.tagsRepository.findByIds(tagIds)

    mood.moodLevel = moodLevel
    mood.note = note
    mood.tags = tags
    mood.feelingIds = feelingIds
    mood.createDateTime = createDateTime

    return this.repo.save(mood)
      .then(e => MoodRO.fromEntity(e))
  }

  public async archive(id: number, { id: userId }: UserDTO): Promise<string> {
    const mood = await this.repo.findOne({ where: { id, owner: { id: userId } } })
    if (!mood) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    mood.isArchived = true

    return this.repo.update({ id }, mood)
      .then(() => `${id} mood is archived`)
  }
}