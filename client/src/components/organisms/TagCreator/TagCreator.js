import React from 'react'

import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { number, func } from 'prop-types'
import {
  TagCreatorStyle, ButtonsStyle,
} from './TagCreatorStyle'
import { Button, Input } from '../../atoms'
import { TagsModel } from '../../../models'

const TagCreator = ({ categoryId, closeModal }) => {
  const onSubmit = (values, setSubmitting) => {
    TagsModel.createTag(values, categoryId)
      .then(() => { closeModal() })
      .finally(() => setSubmitting(false))
  }

  return (
    <TagCreatorStyle>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={
          Yup.object().shape({
            emoji: Yup.string().required('Required'),
            name: Yup.string().required('Required'),
          })
        }
        initialValues={{
          emoji: '',
          name: '',
        }}
        onSubmit={(values, { setSubmitting }) => onSubmit(values, setSubmitting)}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <Field
              as={Input}
              size="lg"
              width="310px"
              name="emoji"
              placeholder="Emoji"
              error={errors.emoji && touched.emoji}
              autoFocus
            />
            <Field
              as={Input}
              size="lg"
              width="310px"
              name="name"
              placeholder="Name"
              error={errors.name && touched.name}
            />
            <ButtonsStyle>
              <Button
                outlined
                inline
                size="lg"
                color="black"
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button
                inline
                outlined
                size="lg"
                color="black"
                type="submit"
                loading={isSubmitting}
              >
                Save
              </Button>
            </ButtonsStyle>
          </Form>
        )}
      </Formik>
    </TagCreatorStyle>
  )
}

TagCreator.propTypes = {
  categoryId: number.isRequired,
  closeModal: func.isRequired,
}

export default TagCreator
