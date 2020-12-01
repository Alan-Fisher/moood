import React from 'react'

import {
  arrayOf, shape, string, number, bool,
} from 'prop-types'
import { ChooseMoodLevelStyle, CellStyle } from './ChooseMoodLevelStyle'
import EmojiWithText from '../EmojiWithText/EmojiWithText'

const ChooseMoodLevel = ({ emojis, value, setFieldValue }) => (
  <ChooseMoodLevelStyle>
    {emojis.map(feeling => {
      const {
        id, emoji, name,
      } = feeling

      return (
        <CellStyle
          isSelected={value === id}
          onClick={() => setFieldValue('moodLevel', id)}
        >
          <EmojiWithText
            emoji={emoji}
            name={name}
            height="25px"
          />
        </CellStyle>
      )
    })}
  </ChooseMoodLevelStyle>
)

ChooseMoodLevel.propTypes = {
  emojis: arrayOf(shape({ id: number, name: string, emoji: string })),
  chooseMany: bool, // eslint-disable-line react/require-default-props
}

ChooseMoodLevel.defaultProps = {
  emojis: [],
}

export default ChooseMoodLevel
