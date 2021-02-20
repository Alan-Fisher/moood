import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { TagsStatsStyle } from './TagsStatsStyle'
import { MoodModel } from '../../../models'
import { removeDuplicatesInArrayOfObjectsByProp } from '../../../common/helpers'
import { Emoji, Space, Text } from '../../atoms'

const TagsStats = () => { // TODO: refactor this gathered on the knee component
  const [mode, setMode] = useState('tags')
  const { moods } = MoodModel

  const getTagsSortedByDays = () => {
    const tagsSortedByDays = []
    moods.forEach(mood => {
      const { createDateTime, tags } = mood
      const moodDate = new Date(Date.parse(createDateTime))
        .toLocaleString('en', { day: 'numeric', month: 'long', year: 'numeric' })
      if (!tagsSortedByDays[moodDate]) {
        tagsSortedByDays[moodDate] = [...tags]
      } else {
        tagsSortedByDays[moodDate] = [...tagsSortedByDays[moodDate], ...tags]
      }
    })

    return tagsSortedByDays
  }

  const getUniqueTagsSortedByDays = () => {
    const uniqueTagsSortedByDays = []
    Object.entries(getTagsSortedByDays()).forEach(item => {
      const date = item[0]
      const tags = item[1]
      const uniqueTags = removeDuplicatesInArrayOfObjectsByProp(tags, 'id')
      uniqueTagsSortedByDays[date] = uniqueTags
    })

    return uniqueTagsSortedByDays
  }

  const getTotalTags = (tags) => Object.entries(tags).reduce((a, b) => ([...a, ...b[1]]), [])

  const countTags = (tagsSortedByDays) => {
    const totalTags = getTotalTags(tagsSortedByDays)

    const countedTags = []
    totalTags.forEach(tag => {
      if (!countedTags[tag.id]) {
        countedTags[tag.id] = { ...tag, count: 1 }
      } else {
        countedTags[tag.id] = { ...tag, count: countedTags[tag.id].count + 1 }
      }
    })

    const sortedTags = countedTags.sort((a, b) => ((a.count < b.count) ? 1 : -1))

    return sortedTags
  }

  const countTagsStats = () => {
    if (mode === 'tags') { // TODO: rename modes?
      return countTags(getTagsSortedByDays())
    }

    if (mode === 'days') {
      return countTags(getUniqueTagsSortedByDays()) // TODO: rename to make clear
    }
  }

  const renderTagsStats = () => countTagsStats().map(({ name, emoji, count }) => (
    <Space>
      <Text size="xl">{count}</Text>
      <Text>
        {name}
        <Emoji emoji={emoji} />
      </Text>
    </Space>
  ))

  return (
    <TagsStatsStyle>
      {moods && renderTagsStats()}
    </TagsStatsStyle>
  )
}

TagsStats.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(TagsStats))
