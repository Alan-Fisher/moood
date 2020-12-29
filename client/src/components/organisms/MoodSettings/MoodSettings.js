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

const MoodSettings = ({
  initialMoodDetails, submitMood, isEditMode,
}) => {
  useEffect(() => {
    TagsModel.getFavoriteTags()

    window.addEventListener('touchmove', blurInput)

    return () => window.removeEventListener('touchmove', blurInput)
  }, [])

  const blurInput = ({ target }) => {
    if (target.id !== 'noteField') {
      document.getElementById('noteField').blur()
    }
  }

  const [openedModal, setOpenedModal] = useState()
  const [isNoteFieldFocused, setNoteFocused] = useState()
  const [extendedEmojis, setExtendedEmojis] = useState()
  const { feelings, moodLevels } = diaryData
  const { favoriteTags } = TagsModel

  const onSubmit = (values) => { // TODO: heal date-time transformations in whole project
    const { date, time, ...params } = values
    const timezoneSecondsOffset = new Date().getTimezoneOffset() * 1000 * 60 // Q: is reliable enough?
    params.createDateTime = new Date(Date.parse(`${date}T${time}:00.000Z`) + timezoneSecondsOffset) // TODO: beautify
    submitMood(params)
  }

  const countHiddenSelections = (selectedIds, notHiddenItems) => {
    const notHiddenIds = notHiddenItems.map(item => item.id)
    const hiddenIds = selectedIds.filter(x => !notHiddenIds.includes(x))

    return hiddenIds.length
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

  const getShowingFavoriteFeelings = () => (extendedEmojis === 'feelings' ? feelings : feelings.slice(0, 9))
  const getShowingFavoriteTags = () => (extendedEmojis === 'tags' ? favoriteTags : favoriteTags.slice(0, 9))

  return (
    <MoodSettingsStyle>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={initialMoodDetails}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <Form>
            <CategoryHeader name="How are you?" />
            <ChooseMoodLevel
              emojis={moodLevels}
              value={values.moodLevel}
              setFieldValue={setFieldValue}
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
              rows={isNoteFieldFocused ? 6 : 1}
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
                // type="submit"
                onMouseDown={() => handleSubmit()}
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
