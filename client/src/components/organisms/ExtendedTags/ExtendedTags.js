import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'

import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import {
  ExtendedTagsStyle, CardsStyle,
} from './ExtendedTagsStyle'
import {
  CollapseCard, EmojiGroup, CancelOrSaveHeader,
} from '../../molecules'
import { FullModal, Text, Icon } from '../../atoms'
import TagCreator from '../TagCreator/TagCreator'
import { TagsModel } from '../../../models'
import TagCategoryCreator from '../TagCategoryCreator/TagCategoryCreator'

const ExtendedTags = ({ outsideSelectedIds, closeModal, saveSelection }) => {
  const [selectedIds, setSelectedIds] = useState([...outsideSelectedIds])
  const [createTagCategoryId, setCreateTagCategoryId] = useState()
  const [isCategoryCreateOpened, setCategoryCreateOpened] = useState()
  const [settingsMode, setSettingsMode] = useState('create')

  const { tagsByCategories } = TagsModel
  useEffect(() => {
    TagsModel.getTagsByCategories()
  }, [])

  const handleDeleteTag = async (tagId) => {
    if (window.confirm('Удалить тэг?')) { // eslint-disable-line no-alert
      await TagsModel.archiveTag(tagId)
    }
  }

  const handleFavorite = (tagId, state) => {
    if (state === 'favorite' && window.confirm('Удалить тэг из избранного?')) { // eslint-disable-line no-alert
      TagsModel.unfavoriteTag(tagId)
    } else {
      TagsModel.favoriteTag(tagId)
    }
  }

  const handleHalfFavorite = (tagId, state) => {
    if (state === 'half-favorite' && window.confirm('Удалить тэг из полуизбранного?')) { // eslint-disable-line no-alert
      TagsModel.unfavoriteTag(tagId)
    } else {
      TagsModel.halfFavoriteTag(tagId)
    }
  }

  const settingsModes = [
    'create',
    'favorite',
    'half-favorite',
    'delete',
  ]

  const switchSettingsMode = () => {
    const modeIndex = settingsModes.indexOf(settingsMode)
    const nextModeIndex = modeIndex !== settingsModes.length - 1 ? modeIndex + 1 : 0 // TODO beauty
    setSettingsMode(settingsModes[nextModeIndex])
  }

  const renderTagsByCategories = () => {
    if (tagsByCategories?.length > 0) {
      return tagsByCategories.map(category => {
        const { name, tags, id: categoryId } = category

        if (categoryId !== 0) {
          return (
            <CollapseCard name={name}>
              <EmojiGroup
                selectedIds={selectedIds}
                setFieldValue={setSelectedIds}
                emojis={tags}
                openModal={() => setCreateTagCategoryId(categoryId)}
                settingsMode={settingsMode}
                handleDelete={handleDeleteTag}
                handleFavorite={handleFavorite}
                handleHalfFavorite={handleHalfFavorite}
              />
            </CollapseCard>
          )
        }

        return null
      })
    }

    if (tagsByCategories?.length === 0) { return <Text size="xl">Нет тэгов</Text> }

    return <Text size="xl">Загрузка...</Text>
  }

  return (
    <ExtendedTagsStyle>
      <CancelOrSaveHeader
        onCancel={() => closeModal()}
        onSave={() => saveSelection('tagIds', selectedIds)}
        headerText="Select tags"
        settingsMode={settingsMode}
        switchSettingsMode={switchSettingsMode}
      />
      <CardsStyle>
        {renderTagsByCategories()}
        <Icon
          onClick={() => setCategoryCreateOpened(true)}
          pointer
          margin="5px 5px 15px 5px"
          size="25px"
          icon={faPlusCircle}
        />
      </CardsStyle>
      {createTagCategoryId
        && (
          <FullModal closeModal={() => setCreateTagCategoryId()}>
            <TagCreator
              closeModal={() => setCreateTagCategoryId()}
              categoryId={createTagCategoryId}
            />
          </FullModal>
        )}
      {isCategoryCreateOpened
        && (
          <FullModal closeModal={() => setCategoryCreateOpened()}>
            <TagCategoryCreator closeModal={() => setCategoryCreateOpened()} />
          </FullModal>
        )}
    </ExtendedTagsStyle>
  )
}

ExtendedTags.propTypes = {
}

ExtendedTags.defaultProps = {
}

export default observer(ExtendedTags)
