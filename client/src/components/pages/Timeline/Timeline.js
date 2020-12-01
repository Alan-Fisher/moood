import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { MoodModel } from '../../../models'

import { TimelineStyle, CardsStyle } from './TimelineStyle'
import { MoodCard } from '../../organisms'
import { Text } from '../../atoms'

const Timeline = () => {
  useEffect(() => {
    MoodModel.getMoods()
  }, [])

  const { moods } = MoodModel

  function renderCards() {
    if (moods?.length > 0) {
      return moods.map(moodDetails => (
        <MoodCard
          key={moodDetails.id}
          moodDetails={moodDetails}
        />
      ))
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
