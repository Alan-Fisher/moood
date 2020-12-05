import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { StatsStyle } from './StatsStyle'
import { MoodModel } from '../../../models'
import { Badge, Text } from '../../atoms'

const Stats = () => {
  useEffect(() => {
    MoodModel.getMoods()
  }, [])

  const { moods } = MoodModel

  const cases = {
    1: {
      width: '20%',
      transform: 'translate(200%, 0%)',
      background: '#12cc63',
    },
    2: {
      width: '40%',
      transform: 'translate(100%, 0%)',
      background: '#12cc63',
    },
    3: {
      width: '60%',
      transform: 'translate(66.7%, 0%)',
      background: '#f06c0e',
    },
    '-1': {
      width: '20%',
      transform: 'translate(100%, 0%)',
      background: '#798EFF',
    },
    '-2': {
      width: '40%',
      transform: 'translate(0%, 0%)',
      background: '#798EFF',
    },
  }

  const renderDateLabel = (createDateTime) => {
    const shouldShowYear = () => new Date().getFullYear() !== new Date(createDateTime).getFullYear()
    const localCreateDate = new Date(createDateTime).toLocaleString('ru', { day: 'numeric', month: 'long', year: shouldShowYear() ? 'numeric' : undefined })

    return (
      <Badge size="sm" margin="15px 5px 0px 15px" color="#888">
        <Text size="sm" color="white">{localCreateDate}</Text>
      </Badge>
    )
  }

  const renderStats = () => moods?.map((moodDetails, idx) => {
    const { createDateTime, moodLevel } = moodDetails
    const addLineStyle = cases[moodLevel] || {}

    const isFirstNoteForDate = () => {
      const toDateString = (dateTime) => new Date(dateTime).toDateString()
      const createDate = toDateString(createDateTime)
      const prevCreateDate = toDateString(moods[idx - 1]?.createDateTime)

      return createDate !== prevCreateDate
    }

    return (
      <>
        {isFirstNoteForDate() && renderDateLabel(createDateTime)}
        <div style={{
          borderRadius: '4px', margin: '8px', background: '#eee', height: '7px',
        }}
        >
          <div style={{
            zIndex: 20,
            left: 0,
            height: '7px',
            borderRadius: '4px',
            ...addLineStyle,
          }}
          />
        </div>
      </>
    )
  })

  return (
    <StatsStyle>
      {renderStats()}
    </StatsStyle>
  )
}

Stats.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(Stats))
