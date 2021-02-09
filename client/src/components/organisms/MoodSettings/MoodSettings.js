import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import {
  bool, func, object,
} from 'prop-types'
import { Formik, Form, Field } from 'formik'

import {
  Input, Button, FullModal, TextArea,
} from '../../atoms'
import {
  EmojiGroup, ChooseMoodLevel, CategoryHeader,
} from '../../molecules'
import { TagsModel } from '../../../models'
import { ExtendedFeelings, ExtendedTags } from '..'
import diaryData from '../../../common/diaryData.json'

import { MoodSettingsStyle, DateTimeSaveButtonStyle, DividerStyle } from './MoodSettingsStyle'
import { maxMoodLevel } from '../../../common/helpers'

const MoodSettings = ({
  initialMoodDetails, submitMood, isEditMode,
}) => {
  useEffect(() => {
    TagsModel.getFavoriteTags()
    TagsModel.getTagsByCategories()

    window.addEventListener('touchmove', blurInput)

    return () => window.removeEventListener('touchmove', blurInput)
  }, [])

  const blurInput = ({ target }) => {
    if (target.id !== 'noteField') {
      document.getElementById('noteField').blur()
    }
  }

  const isInitialMoodLevelRanged = () => {
    try {
      const { moodLevel } = initialMoodDetails
      if (moodLevel - Math.floor(moodLevel) === 0.5) {
        return true
      }

      return false
    } catch {
      return false
    }
  }

  const [openedModal, setOpenedModal] = useState()
  const [isNoteFieldFocused, setNoteFocused] = useState()
  const [extendedEmojis, setExtendedEmojis] = useState()
  const [isMoodLevelRanged, setMoodLevelRanged] = useState(isInitialMoodLevelRanged())
  const { feelings, moodLevels } = diaryData
  const { favoriteTags } = TagsModel

  const onSubmit = (values, setSubmitting) => { // TODO: heal date-time transformations in whole project
    const { date, time, ...params } = values
    const timezoneSecondsOffset = new Date().getTimezoneOffset() * 1000 * 60 // Q: is reliable enough?
    params.createDateTime = new Date(Date.parse(`${date}T${time}:00.000Z`) + timezoneSecondsOffset) // TODO: beautify
    submitMood(params, setSubmitting)
  }

  const countHiddenSelections = (selectedIds = [], notHiddenItems) => {
    const notHiddenIds = notHiddenItems.map(item => item.id)
    const hiddenIds = selectedIds.filter(x => !notHiddenIds.includes(x))

    return hiddenIds.length || 0
  }

  const onCategoryClick = (categoryName) => {
    if (extendedEmojis === categoryName) {
      setExtendedEmojis()
    } else {
      setExtendedEmojis(categoryName)
    }
  }

  const extendNoteField = async () => {
    await setNoteFocused(true)
    const scrollableElementId = isEditMode ? 'moodEditor' : 'appBody'
    document.getElementById(scrollableElementId).scroll({ top: 5000, behavior: 'smooth' })
  }

  const switchMoodLevelRanged = (setFieldValue, currentMoodLevel) => {
    let newMoodLevel = currentMoodLevel + 0.5 // TODO: beautify and move the logic of moodLevelRanged in one place
    if (currentMoodLevel >= maxMoodLevel) {
      newMoodLevel = currentMoodLevel - 0.5
    }

    if (isMoodLevelRanged) {
      newMoodLevel = Math.floor(currentMoodLevel)
    }
    setFieldValue('moodLevel', newMoodLevel)
    setMoodLevelRanged(!isMoodLevelRanged)
  }

  const mockTags = [{}, {}, {}, {}, {}, {}, {}, {}, {}] // TODO: beautify and change loader approach

  const getShowingFavoriteFeelings = () => (extendedEmojis === 'feelings' ? feelings : feelings.slice(0, 9))
  const getShowingFavoriteTags = () => (extendedEmojis === 'tags'
    ? favoriteTags
    : (favoriteTags || mockTags).slice(0, 9))

  return (
    <MoodSettingsStyle>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialMoodDetails}
        onSubmit={(values, { setSubmitting }) => onSubmit(values, setSubmitting)}
      >
        {({
          handleSubmit, setFieldValue, setSubmitting, isSubmitting, values,
        }) => (
          <Form>
            <CategoryHeader
              handleClick={() => switchMoodLevelRanged(setFieldValue, values.moodLevel)}
              isRanged={isMoodLevelRanged}
              name="How are you?"
            />
            <ChooseMoodLevel
              moodLevels={moodLevels}
              value={values.moodLevel}
              setFieldValue={setFieldValue}
              isMoodLevelRanged={isMoodLevelRanged}
            />
            <DividerStyle />
            <CategoryHeader
              name="Feelings"
              handleClick={() => onCategoryClick('feelings')}
              isExtended={extendedEmojis === 'feelings'}
            />
            {extendedEmojis !== 'tags'
              && (
                <EmojiGroup
                  emojis={getShowingFavoriteFeelings()}
                  selectedIds={values.feelingIds}
                  setFieldValue={feelingIds => setFieldValue('feelingIds', feelingIds)}
                  openModal={() => setOpenedModal('ExtendedFeelings')}
                  extraSelected={countHiddenSelections(values.feelingIds, getShowingFavoriteFeelings())}
                />
              )}
            {!extendedEmojis && <DividerStyle />}
            <CategoryHeader
              name="Tags"
              handleClick={() => onCategoryClick('tags')}
              isExtended={extendedEmojis === 'tags'}
            />
            {extendedEmojis !== 'feelings'
              && (
                <EmojiGroup
                  emojis={getShowingFavoriteTags()}
                  selectedIds={values.tagIds}
                  setFieldValue={tagIds => setFieldValue('tagIds', tagIds)}
                  openModal={() => setOpenedModal('ExtendedTags')}
                  extraSelected={countHiddenSelections(values.tagIds, getShowingFavoriteTags())}
                />
              )}
            {!extendedEmojis && <DividerStyle />}
            <CategoryHeader name="Add a note" />
            <Field
              as={TextArea}
              onFocus={() => extendNoteField()}
              onBlur={() => setNoteFocused()}
              rows={isNoteFieldFocused ? 8 : 1}
              size="lg"
              width="310px"
              name="note"
              id="noteField"
            />
            <DateTimeSaveButtonStyle>
              <Field
                as={Input}
                type="date"
                name="date"
                width="500px"
                size="lg"
              />
              <Field
                as={Input}
                name="time"
                type="time"
                width="180px"
                size="lg"
              />
              <Button
                outlined
                size="lg"
                color="black"
                onMouseDown={() => handleSubmit()}
                loading={isSubmitting}
              >
                Save
              </Button>
            </DateTimeSaveButtonStyle>
            {openedModal === 'ExtendedFeelings'
              && (
                <FullModal closeModal={() => setOpenedModal(null)}>
                  <ExtendedFeelings
                    outsideSelectedIds={values.feelingIds}
                    closeModal={() => setOpenedModal(null)}
                    saveSelection={(field, value) => { setFieldValue(field, value); setOpenedModal(null) }}
                  />
                </FullModal>
              )}
            {openedModal === 'ExtendedTags'
              && (
                <FullModal closeModal={() => setOpenedModal(null)}>
                  <ExtendedTags
                    outsideSelectedIds={values.tagIds}
                    closeModal={() => setOpenedModal(null)}
                    saveSelection={(field, value) => { setFieldValue(field, value); setOpenedModal(null) }}
                  />
                </FullModal>
              )}
          </Form>
        )}
      </Formik>
    </MoodSettingsStyle>
  )
}

MoodSettings.propTypes = {
  // eslint-disable-next-line
  initialMoodDetails: object, // TODO: make shape 
  isEditMode: bool,
  submitMood: func.isRequired,
}

MoodSettings.defaultProps = {
  isEditMode: false,
}

export default observer(MoodSettings)
