import React from 'react'

import {
  arrayOf, shape, string, number, bool,
} from 'prop-types'
import { ChooseMoodLevelRangeStyle, CellStyle } from './ChooseMoodLevelRangeStyle'
import EmojiWithText from '../EmojiWithText/EmojiWithText'

const ChooseMoodLevelRange = ({ // TODO: try to adopt input range idea
  emojis, value, setFieldValue, isMoodLevelRanged,
}) => {
  const isLevelSelected = (moodLevel) => {
    if (isMoodLevelRanged && [Math.floor(value), Math.ceil(value)].includes(moodLevel)) {
      return true
    }

    if (!isMoodLevelRanged && value === moodLevel) {
      return true
    }

    return false
  }

  const handleMoodLevelChange = (moodLevel) => {
    if (isMoodLevelRanged) {
      setFieldValue('moodLevel', moodLevel + 0.5)
    } else {
      setFieldValue('moodLevel', moodLevel)
    }
  }

  return (
    <>
      <input
        style={{ width: '312px' }}
        type="range"
        min="-2"
        max="3"
        step="any"
        value={value}
        onChange={({ target }) => setFieldValue('moodLevel', target.value)}
      />
      <ChooseMoodLevelRangeStyle>
        {emojis.map(feeling => {
          const {
            moodLevel, emoji, name,
          } = feeling

          return (
            <EmojiWithText
              emoji={emoji}
              name={name}
              height="20px"
            />
          )
        })}
      </ChooseMoodLevelRangeStyle>
    </>
  )
}

ChooseMoodLevelRange.propTypes = {
  emojis: arrayOf(shape({ moodLevel: number, name: string, emoji: string })),
  chooseMany: bool, // eslint-disable-line react/require-default-props
}

ChooseMoodLevelRange.defaultProps = {
  emojis: [],
}

export default ChooseMoodLevelRange
