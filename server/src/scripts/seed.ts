import * as _ from 'lodash'
import { createConnection, ConnectionOptions } from 'typeorm'
import { configService } from '../config/config.service'
import { TagCategoryService } from '../tagCategory/tagCategory.service'
import { TagCategory } from '../tagCategory/tagCategory.entity'
import { TagCategoryDTO } from '../tagCategory/tagCategory.dto'
import { TagDTO } from '../tag/tag.dto'
import { Tag } from '../tag/tag.entity'
import { TagService } from '../tag/tag.service'
import { UserService } from '../user/user.service'
import { User } from '../user/user.entity'
import { MoodDTO } from '../mood/mood.dto'
import { MoodService } from '../mood/mood.service'
import { Mood } from '../mood/mood.entity'


async function run() {
  const tagsByCategories = await require("./alanTagsByCategories.json")
  const moods = await require("./alanMoods.json")
  const user = { id: 1, username: '', email: '' } // TODO: add autosearch by email or better add autoseed on reg

  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true
  }

  const connection = await createConnection(opt as ConnectionOptions)
  const tagCategoryService = new TagCategoryService(
    connection.getRepository(TagCategory),
    new UserService(connection.getRepository(User))
  )
  const tagService = new TagService(
    connection.getRepository(Tag),
    connection.getRepository(TagCategory),
    new UserService(connection.getRepository(User))
  )

  const moodService = new MoodService(
    connection.getRepository(Mood),
    connection.getRepository(Tag),
    new UserService(connection.getRepository(User))
  )

  const work = tagsByCategories
    .map(category => {
      tagCategoryService.create(
        TagCategoryDTO.from({ name: category.name }),
        user
      )
        .then(({ id: categoryId }) => {
          const { tags: categoryTags } = category
          categoryTags.forEach(tag => {
            tagService.create(
              `${categoryId}`,
              TagDTO.from({
                emoji: tag.emoji,
                name: tag.name,
                state: tag.state
              }),
              user
            )
          })
        })

    })

  // const work = moods
  //   .map(async mood => {
  //     const moodWithTags = MoodDTO.from(mood)

  //     if (mood?.tags && mood.tags.length > 0) {
  //       const tagIds = await mood.tags.map(async backupTag => {
  //         const dbTag = await connection.getRepository(Tag).findOne({
  //           where: { name: backupTag?.name },
  //         })
  //         if (dbTag) { return await dbTag.id }
  //       })

  //       moodWithTags.tagIds = await Promise.all(tagIds)
  //       console.log(moodWithTags)
  //     }

  //     moodService.create(
  //       moodWithTags,
  //       user
  //     )
  //   })

  return await Promise.all(work)
}

run()
  .then(() => console.log('seeding...'))
  .catch(err => console.error('seed error', err))