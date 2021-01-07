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

async function run() {
  const tagsByCategories = await require("./initialTagsByCategories.json")
  const user = { id: 1, username: '', email: '' } // TODO: add autosearch by email or better add autoseed on signup

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

  return await Promise.all(work)
}

run()
  .then(() => console.log('seeding...'))
  .catch(err => console.error('seed error', err))