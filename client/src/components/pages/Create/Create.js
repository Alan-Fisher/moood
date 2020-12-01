import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { Formik, Form, Field } from 'formik'

import {
  Input, Button, FullModal, TextArea,
} from '../../atoms'
import {
  EmojiGroup, ChooseMoodLevel, CategoryHeader,
} from '../../molecules'
import { MoodModel, TagsModel } from '../../../models'
import { ExtendedFeelings, ExtendedTags } from '../../organisms'
import diaryData from '../../../common/diaryData.json'

import { CreateStyle, DateTimeSaveButtonStyle, DividerStyle } from './CreateStyle'

const Create = ({ history }) => {
  useEffect(() => {
    TagsModel.getFavoriteTags()
  }, [])

  const [openedModal, setOpenedModal] = useState()
  const [isNoteFieldFocused, setNoteFocused] = useState()
  const [extendedEmojis, setExtendedEmojis] = useState()
  const { feelings, moodLevels } = diaryData
  const { favoriteTags } = TagsModel

  function onSubmit(values) {
    const { date, time, ...params } = values
    params.createDateTime = new Date(Date.parse(`${date}T${time}:00.000Z`) - 1000 * 60 * 60 * 6) // TODO: beautify
    MoodModel.sendMood(params).then(() => history.push('/timeline'))
  }

  function countHiddenSelections(selectedIds, notHiddenItems) {
    const notHiddenIds = notHiddenItems.map(item => item.id)
    const hiddenIds = selectedIds.filter(x => !notHiddenIds.includes(x))

    return hiddenIds.length
  }

  function onCategoryClick(categoryName) {
    if (extendedEmojis === categoryName) {
      setExtendedEmojis()
    } else {
      setExtendedEmojis(categoryName)
    }
  }

  const getShowingFavoriteFeelings = () => (extendedEmojis === 'feelings' ? feelings : feelings.slice(0, 9))
  const getShowingFavoriteTags = () => (extendedEmojis === 'tags' ? favoriteTags : favoriteTags.slice(0, 9))

  return (
    <CreateStyle>
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          moodLevel: 1,
          feelingIds: [],
          tagIds: [],
          note: '',
          date: new Date().toISOString() // TODO: beautify
            .replace(
              /^(?<year>\d+)-(?<month>\d+)-(?<day>\d+)T.*$/,
              '$<year>-$<month>-$<day>',
            ),
          time: new Date().toLocaleString('ru', {
            hour: 'numeric', minute: 'numeric',
          }),
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          errors,
          setFieldValue,
          setErrors,
          handleSubmit,
          touched,
          focus,
          isSubmitting,
          values,
        }) => (
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
              onFocus={() => setNoteFocused(true)}
              onBlur={() => setNoteFocused()}
              rows={isNoteFieldFocused ? 6 : 1}
              size="lg"
              width="310px"
              name="note"
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
                type="submit"
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
    </CreateStyle>
  )
}

Create.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(Create))
