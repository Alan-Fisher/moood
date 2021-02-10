import React from 'react'
import {
  faCommentAlt, faArrowsAltH,
} from '@fortawesome/free-solid-svg-icons'
import { diaryData, feelings } from '../../../common'
import spinner from '../../../common/spinner.svg'

import { MoodCardStyle } from './MoodCardStyle'
import {
  Text, Icon, Tag, Emoji, Spinner,
} from '../../atoms'

const MoodCard = ({ moodDetails, isLoading, onClick }) => {
  const {
    note, moodLevel, createDateTime, feelingIds, tags,
  } = moodDetails

  const getEmoji = (id) => {
    const { moodLevels } = diaryData

    return moodLevels.filter(item => item.moodLevel === id)[0]
  }

  const renderMoodLevel = () => {
    if (Number.isInteger(moodLevel)) {
      const { emoji, name } = getEmoji(moodLevel)

      return (
        <Text size="xl">
          {name}
          <Emoji margin="0 0 0 5px" emoji={emoji} />
        </Text>
      )
    }

    const { emoji: firstEmoji, name: firstName } = getEmoji(Math.floor(moodLevel))
    const { emoji: secondEmoji, name: secondName } = getEmoji(Math.ceil(moodLevel))

    return (
      <Text size="xl">
        {firstName}
        <Icon margin="5px" icon={faArrowsAltH} />
        {secondName}
        <Emoji margin="0 0 0 5px" emoji={firstEmoji} />
        <Emoji margin="0 0 0 -10px" emoji={secondEmoji} />
      </Text>
    )
  }

  const allFeelings = [...feelings.positive, ...feelings.negative]
  const feelingNamesById = {}
  allFeelings.forEach(feeling => {
    const { id, name } = feeling
    feelingNamesById[id] = name
  })

  return (
    <MoodCardStyle onClick={onClick}>
      {isLoading
        && (
          <Spinner
            size={12}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          />
        )}
      {renderMoodLevel()}
      <Text size="md">
        {new Date(Date.parse(createDateTime)).toLocaleString('en-GB', {
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
