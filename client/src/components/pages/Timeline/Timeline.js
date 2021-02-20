import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import {
  faChevronLeft, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons'
import { MoodModel } from '../../../models'

import { TimelineStyle, CardsStyle } from './TimelineStyle'
import { MoodCard, MoodEditor } from '../../organisms'
import {
  Text, Badge, FullModal, Icon, Button, Link, Space, Spinner,
} from '../../atoms'

const Timeline = () => {
  const [editingMoodId, setEditingMoodId] = useState(null)
  const [page, setPage] = useState(1)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    const moodsOnPage = 100
    const loadedMoods = moodsOnPage * (page - 1)
    setLoading(true)
    MoodModel.getMoods(moodsOnPage, loadedMoods)
      .finally(() => setLoading(false))
  }, [page])

  const { moods } = MoodModel

  const openMoodEditor = (moodId) => {
    setEditingMoodId(moodId)
    MoodModel.getMood(moodId)
  }

  const renderDateLabel = (createDateTime) => {
    const shouldShowYear = () => new Date().getFullYear() !== new Date(createDateTime).getFullYear()
    const localCreateDate = new Date(createDateTime)
      .toLocaleString('en', {
        day: 'numeric',
        month: 'long',
        year: shouldShowYear() ? 'numeric' : undefined,
      })

    return (
      <Badge margin="0px auto 7px">
        <Text color="white">{localCreateDate}</Text>
      </Badge>
    )
  }

  const renderCards = () => {
    if (moods?.length > 0) {
      return moods.map((moodDetails, idx) => {
        const { createDateTime, id } = moodDetails

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
              key={id}
              moodDetails={moodDetails}
              onClick={() => openMoodEditor(id)}
              isLoading={id === editingMoodId}
            />
          </>
        )
      })
    }

    if (moods?.length === 0) { return <Text size="xl">No moods</Text> }

    return (
      <Spinner
        style={{
          paddingTop: '185px',
        }}
      />
    )
  }

  const archiveMood = (moodId) => {
    if (window.confirm('Delete mood?')) { // eslint-disable-line no-alert
      MoodModel.archiveMood(moodId)
        .then(() => setEditingMoodId(null))
    }
  }

  return (
    <>
      <TimelineStyle>
        <CardsStyle>
          {renderCards()}
          {moods?.length > 0
            && (
              <Button
                outlined
                color="black"
                onClick={() => setPage(page + 1)}
                loading={isLoading}
              >
                Load more
              </Button>
            )}
        </CardsStyle>
      </TimelineStyle>
      {editingMoodId && MoodModel.mood && (
        <FullModal closeModal={() => setEditingMoodId(null)}>
          <Space style={{ padding: '15px 15px 0', justifyContent: 'space-between' }}>
            <Space onClick={() => setEditingMoodId(null)}>
              <Icon
                margin="0px 5px"
                size="25px"
                icon={faChevronLeft}
                pointer
              />
              <Link color="black" size="lg">Back</Link>
            </Space>
            <Icon
              onClick={() => archiveMood(editingMoodId)}
              margin="5px 5px"
              size="20px"
              icon={faTrashAlt}
              pointer
            />
          </Space>
          <MoodEditor
            closeMoodEditor={() => setEditingMoodId(null)}
            moodId={editingMoodId}
          />
        </FullModal>
      )}
    </>
  )
}

Timeline.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(Timeline))
