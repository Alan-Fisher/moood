import React, { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import smoothscroll from 'smoothscroll-polyfill'
import { MoodModel } from '../../../models'
import {
  Badge, Emoji, Space, Spinner, Text,
} from '../../atoms'
import feelings from '../../../common/feelings.json'
import {
  StatsStyle, LineBackgroundStyle, LineStyle, FeelingsLineStyle, LineInfoStyle,
} from './StatsStyle'
import MoodCard from '../../organisms/MoodCard/MoodCard'
import { transformDateTimeToDate, transformDateTimeToTime } from '../../../common/helpers'

smoothscroll.polyfill()

const Stats = () => { // TODO: refactor this gathered on the knee component
  useEffect(() => {
    MoodModel.getMoods()
  }, [])
  const { moods } = MoodModel

  const statsLinesRef = useRef(null)
  useEffect(() => {
    const statsLines = statsLinesRef.current

    if (statsLines) {
      statsLines.scroll({
        top: statsLines.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [moods])

  const [openedMoodCardId, setOpenedMoodCardId] = useState()
  const [selectedDate, setSelectedDate] = useState()

  const getStyleByLevel = (level) => {
    const countedWidth = Math.abs(level) * 20
    if (level < 0) {
      return {
        width: `${countedWidth}%`,
        left: `${40 - countedWidth}%`,
        background: '#798EFF',
        borderRadius: '5px 0 0 5px',
      }
    }

    if (level >= 0) {
      return {
        width: level === 0 ? '3%' : `${countedWidth}%`,
        left: '40%',
        background: level < 3 ? '#12cc63' : '#f06c0e',
        borderRadius: '0 5px 5px 0',
      }
    }
  }

  const handleDateBadgeClick = (date) => {
    if (selectedDate !== date) {
      setSelectedDate(date)
    } else {
      setSelectedDate()
    }
  }

  const positiveFeelingsIds = feelings.positive.map(({ id }) => id)
  const negativeFeelingsIds = feelings.negative.map(({ id }) => id)

  const renderDateLabel = (createDateTime) => {
    const shouldShowYear = () => new Date().getFullYear() !== new Date(createDateTime).getFullYear()
    const localCreateDate = new Date(createDateTime)
      .toLocaleString('en', { day: 'numeric', month: 'long', year: shouldShowYear() ? 'numeric' : undefined })

    return (
      <Badge
        onClick={() => handleDateBadgeClick(transformDateTimeToDate(createDateTime))}
        size="sm"
        margin="15px 5px 0px 7px"
        pointer
      >
        <Text color="white" size="sm">
          {localCreateDate}
        </Text>
      </Badge>
    )
  }

  const handleLineClick = (lineId) => {
    if (openedMoodCardId !== lineId) {
      setOpenedMoodCardId(lineId)
    } else {
      setOpenedMoodCardId()
    }
  }

  const renderStats = () => {
    if (moods?.length > 0) {
      const renderedStats = moods.map((moodDetails, idx) => {
        const {
          createDateTime, moodLevel, feelingIds, id, tags,
        } = moodDetails

        const isFirstNoteForDate = () => {
          const toDateString = (dateTime) => new Date(dateTime).toDateString()
          const createDate = toDateString(createDateTime)
          const prevCreateDate = toDateString(moods[idx + 1]?.createDateTime) // +1 because later will be reversed

          return createDate !== prevCreateDate
        }

        const negativeFeelingsCount = feelingIds.reduce((a, c) => (
          a + (negativeFeelingsIds.includes(c) ? 1 : 0)
        ), 0)

        const positiveFeelingsCount = feelingIds.reduce((a, c) => (
          a + (positiveFeelingsIds.includes(c) ? 1 : 0)
        ), 0)

        return (
          <div key={id}>
            {isFirstNoteForDate() && renderDateLabel(createDateTime)}
            <LineBackgroundStyle
              isActive={id === openedMoodCardId}
              onClick={() => handleLineClick(id)}
            >
              <LineStyle style={getStyleByLevel(moodLevel)} />
              {moodLevel === 0
                && (
                  <LineStyle style={{
                    width: '3%',
                    left: '37%',
                    background: '#798EFF',
                    borderRadius: '5px 0 0 5px',
                  }}
                  />
                )}
              {negativeFeelingsCount > 0
                && (
                <FeelingsLineStyle style={getStyleByLevel(negativeFeelingsCount * -0.1)} />
                )}
              {positiveFeelingsCount > 0
                && (
                <FeelingsLineStyle isPositive style={getStyleByLevel(positiveFeelingsCount * 0.1)} />
                )}
              <LineInfoStyle>
                <Text size="xs" color="gray">
                  {transformDateTimeToTime(createDateTime)}
                </Text>
                {transformDateTimeToDate(createDateTime) === selectedDate
                && (
                <Space>
                  {tags.map(({ emoji, tagId }) => (
                    <Emoji
                      key={tagId}
                      margin="0 1px"
                      height="10px"
                      emoji={emoji}
                    />
                  ))}
                </Space>
                )}
              </LineInfoStyle>
            </LineBackgroundStyle>
            {openedMoodCardId === id
                && <MoodCard onClick={() => setOpenedMoodCardId()} moodDetails={moodDetails} />}
          </div>
        )
      }).reverse()

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
    <StatsStyle ref={statsLinesRef}>
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
