import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { MoodModel } from '../../../models'

import { TimelineStyle, CardsStyle } from './TimelineStyle'
import { MoodCard } from '../../organisms'
import { Text, Badge } from '../../atoms'

const Timeline = () => {
  useEffect(() => {
    MoodModel.getMoods()
  }, [])

  const { moods } = MoodModel

  const renderDateLabel = (createDateTime) => {
    const shouldShowYear = () => new Date().getFullYear() !== new Date(createDateTime).getFullYear()
    const localCreateDate = new Date(createDateTime).toLocaleString('ru', { day: 'numeric', month: 'long', year: shouldShowYear() ? 'numeric' : undefined })

    return (
      <Badge margin="0px auto 7px">
        <Text color="white">{localCreateDate}</Text>
      </Badge>
    )
  }

  function renderCards() {
    if (moods?.length > 0) {
      return moods.map((moodDetails, idx) => {
        const { createDateTime } = moodDetails

        const isFirstNoteForDate = () => {
          const toDateString = (dateTime) => new Date(dateTime).toDateString()
          const createDate = toDateString(createDateTime)
          const prevCreateDate = toDateString(moods[idx - 1]?.createDateTime)

          return createDate !== prevCreateDate
        }

        return (
          <>
            {isFirstNoteForDate() && renderDateLabel(createDateTime)}
            <MoodCard
              key={moodDetails.id}
              moodDetails={moodDetails}
            />
          </>
        )
      })
    }

    if (moods?.length === 0) { return <Text size="xl">Нет записей</Text> }

    return <Text size="xl">Загрузка...</Text>
  }

  return (
    <TimelineStyle>
      <CardsStyle>
        {renderCards()}
      </CardsStyle>
    </TimelineStyle>
  )
}

Timeline.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(Timeline))
