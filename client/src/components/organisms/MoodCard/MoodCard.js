import React from 'react'
import { faTimesCircle, faCommentAlt } from '@fortawesome/free-solid-svg-icons'
import { diaryData, feelings } from '../../../common'

import { MoodCardStyle } from './MoodCardStyle'
import {
  Text, Icon, Tag, Emoji,
} from '../../atoms'

import { MoodModel } from '../../../models'

const MoodCard = ({ moodDetails, onClick }) => {
  const {
    id, note, moodLevel, createDateTime, feelingIds, tags,
  } = moodDetails

  const getEmoji = (id) => {
    const { moodLevels } = diaryData

    return moodLevels.filter(item => item.id === id)[0]
  }

  const { emoji, name } = getEmoji(moodLevel)

  const allFeelings = [...feelings.positive, ...feelings.negative]
  const feelingNamesById = {}
  allFeelings.forEach(feeling => {
    const { id, name } = feeling
    feelingNamesById[id] = name
  })

  const archiveMood = (e) => {
    e.stopPropagation()
    if (window.confirm('Delete mood?')) { // eslint-disable-line no-alert
      MoodModel.archiveMood(id)
    }
  }

  return (
    <MoodCardStyle onClick={() => onClick()}>
      <Icon
        icon={faTimesCircle}
        size="20px"
        pointer
        onClick={(e) => archiveMood(e)}
      />
      <Text size="xl">
        {name}
        <Emoji margin="0 0 0 5px" emoji={emoji} />
      </Text>
      <Text size="md">
        {new Date(Date.parse(createDateTime)).toLocaleString('ru', {
          day: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric',
        })}
      </Text>
      {tags.map(({ name: tagName }) => <Tag name={tagName} />)}
      <Text>
        {feelingIds?.map((id, i) => (feelingNamesById[id] + (i < feelingIds.length - 1 ? ', ' : '')))}
      </Text>
      {note
        && (
          <Text margin="10px 5px 5px" lineHeight="16px">
            <Icon size="13px" margin="0 4px 0 0" color="#444" icon={faCommentAlt} />
            {note}
          </Text>
        )}
    </MoodCardStyle>
  )
}

MoodCard.propTypes = {
}

MoodCard.defaultProps = {
}

export default MoodCard
