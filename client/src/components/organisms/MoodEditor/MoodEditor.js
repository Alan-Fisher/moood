import React, { useEffect } from 'react'
import { observer } from 'mobx-react'

import { func, number } from 'prop-types'
import { MoodEditorStyle } from './MoodEditorStyle'
import { MoodSettings } from '..'
import { MoodModel } from '../../../models'
import { transformDateForInput } from '../../../common/helpers'

const MoodEditor = ({ moodId, closeMoodEditor }) => {
  useEffect(() => {
    MoodModel.getMood(moodId)
  }, [moodId])
  const { mood } = MoodModel

  const updateMood = (moodDetails) => {
    MoodModel.updateMood(moodId, moodDetails).then(() => {
      closeMoodEditor()
    })
  }

  const getTransformedMoodDetails = () => {
    if (mood) {
      const moodDetails = { ...mood }
      const { createDateTime, tags } = mood
      const parsedCreatedDateTime = new Date(Date.parse(createDateTime))

      moodDetails.tagIds = tags.map(({ id }) => id)
      moodDetails.date = transformDateForInput(parsedCreatedDateTime)
      moodDetails.time = parsedCreatedDateTime.toLocaleString('en', { // TODO: DRY all datetime working
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit',
      })

      delete moodDetails.id // TODO: return only needed entries from the beginning
      delete moodDetails.createDateTime
      delete moodDetails.tags
      delete moodDetails.isArchived

      return moodDetails
    }

    return null
  }

  const initialMoodDetails = getTransformedMoodDetails()

  return (
    <MoodEditorStyle id="moodEditor">
      {initialMoodDetails && (
        <MoodSettings
          initialMoodDetails={initialMoodDetails}
          submitMood={updateMood}
          isEditMode
        />
      )}
    </MoodEditorStyle>
  )
}

MoodEditor.propTypes = {
  moodId: number.isRequired,
  closeMoodEditor: func, // eslint-disable-line react/require-default-props
}

export default observer(MoodEditor)
