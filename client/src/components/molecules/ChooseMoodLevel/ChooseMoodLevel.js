import React from 'react'

import {
  arrayOf, shape, string, number, bool,
} from 'prop-types'
import { faArrowsAltH } from '@fortawesome/free-solid-svg-icons'
import { ChooseMoodLevelStyle, CellStyle, RangeIconStyle } from './ChooseMoodLevelStyle'
import EmojiWithText from '../EmojiWithText/EmojiWithText'
import { Icon } from '../../atoms'
import { maxMoodLevel } from '../../../common/helpers'

const ChooseMoodLevel = ({
  moodLevels, value, setFieldValue, isMoodLevelRanged,
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

  const handleMoodLevelChange = (moodLevel) => { // TODO: beautify
    let newMoodLevel = moodLevel

    if (isMoodLevelRanged) {
      if (moodLevel < maxMoodLevel) {
        newMoodLevel = moodLevel + 0.5
      } else {
        newMoodLevel = moodLevel - 0.5
      }
    }

    setFieldValue('moodLevel', newMoodLevel)
  }

  return (
    <ChooseMoodLevelStyle>
      {moodLevels.map(item => {
        const {
          moodLevel, emoji, name,
        } = item

        return (
          <CellStyle
            isSelected={isLevelSelected(moodLevel)}
            onClick={() => handleMoodLevelChange(moodLevel)}
          >
            <EmojiWithText
              emoji={emoji}
              name={name}
              height="25px"
            />
            {isMoodLevelRanged && moodLevel === Math.ceil(value) // TODO: beautify this idea
              && (
                <RangeIconStyle>
                  <Icon size="18px" icon={faArrowsAltH} />
                </RangeIconStyle>
              )}
          </CellStyle>
        )
      })}
    </ChooseMoodLevelStyle>
  )
}

ChooseMoodLevel.propTypes = {
  moodLevels: arrayOf(shape({ moodLevel: number, name: string, emoji: string })),
  chooseMany: bool, // eslint-disable-line react/require-default-props
}

ChooseMoodLevel.defaultProps = {
  moodLevels: [],
}

export default ChooseMoodLevel
