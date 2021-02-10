import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { StatsStyle } from './StatsStyle'
import { MoodModel } from '../../../models'
import { Badge, Spinner, Text } from '../../atoms'

const Stats = () => { // TODO: refactor this gathered on the knee component
  useEffect(() => {
    MoodModel.getMoods()
  }, [])

  const { moods } = MoodModel

  const cases = { // TODO: oh shit it is temporary!
    '-2': {
      width: '40%',
      transform: 'translate(0%, 0%)',
      background: '#798EFF',
      borderRadius: '5px 0 0 5px',
    },
    '-1.5': {
      width: '30%',
      transform: 'translate(33.8%, 0%)',
      background: '#798EFF',
      borderRadius: '5px 0 0 5px',
    },
    '-1': {
      width: '20%',
      transform: 'translate(100%, 0%)',
      background: '#798EFF',
      borderRadius: '5px 0 0 5px',
    },
    '-0.5': {
      width: '10%',
      transform: 'translate(301.8%, 0%)',
      background: '#798EFF',
      borderRadius: '5px 0 0 5px',
    },
    0: {
      width: '4%',
      transform: 'translate(1002.5%, 0%)',
      background: '#12cc63',
      borderRadius: '0 5px 5px 0',
    },
    0.5: {
      width: '10%',
      transform: 'translate(400%, 0%)',
      background: '#12cc63',
      borderRadius: '0 5px 5px 0',
    },
    1: {
      width: '20%',
      transform: 'translate(200%, 0%)',
      background: '#12cc63',
      borderRadius: '0 5px 5px 0',
    },
    1.5: {
      width: '30%',
      transform: 'translate(133.3%, 0%)',
      background: '#12cc63',
      borderRadius: '0 5px 5px 0',
    },
    2: {
      width: '40%',
      transform: 'translate(100%, 0%)',
      background: '#12cc63',
      borderRadius: '0 5px 5px 0',
    },
    2.5: {
      width: '50%',
      transform: 'translate(80%, 0%)',
      background: '#12cc63',
      borderRadius: '0 5px 5px 0',
    },
    3: {
      width: '60%',
      transform: 'translate(66.7%, 0%)',
      background: '#f06c0e',
      borderRadius: '0 5px 5px 0',
    },
  }

  const renderDateLabel = (createDateTime) => {
    const shouldShowYear = () => new Date().getFullYear() !== new Date(createDateTime).getFullYear()
    const localCreateDate = new Date(createDateTime)
      .toLocaleString('en', { day: 'numeric', month: 'long', year: shouldShowYear() ? 'numeric' : undefined })

    return (
      <Badge
        size="sm"
        margin="15px 5px 0px 7px"
      >
        <Text
          color="white"
          size="sm"
        >
          {localCreateDate}
        </Text>
      </Badge>
    )
  }

  const renderStats = () => {
    if (moods?.length > 0) {
      const renderedStats = moods.map((moodDetails, idx) => {
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
                ...addLineStyle,
              }}
              />
              {moodLevel === 0
            && (
              <div style={{
                zIndex: 20,
                left: 0,
                height: '7px',
                width: '4%',
                transform: 'translate(905%, -100%)',
                background: '#798EFF',
                borderRadius: '5px 0 0 5px',
              }}
              />
            )}
            </div>
          </>
        )
      })

      return <div style={{ width: '100%' }}>{renderedStats}</div>
    }

    if (moods?.length === 0) { return <Text size="xl">No moods</Text> }

    return (
      <Spinner
        style={{
          paddingTop: '200px',
        }}
      />
    )
  }

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
