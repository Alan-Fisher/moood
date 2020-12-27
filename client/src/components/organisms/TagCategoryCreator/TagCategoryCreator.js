import React from 'react'

import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { func } from 'prop-types'
import { TagCategoryCreatorStyle, ButtonsStyle } from './TagCategoryCreatorStyle'
import { Button, Input } from '../../atoms'
import { TagsModel } from '../../../models'

const TagCategoryCreator = ({ closeModal }) => {
  const onSubmit = (name) => {
    try {
      TagsModel.createTagCategory(name)
    } catch {
      throw new Error()
    }
    closeModal()
  }

  return (
    <TagCategoryCreatorStyle>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={Yup.object().shape({ name: Yup.string().required('Required') })}
        initialValues={{ name: '' }}
        onSubmit={({ name }) => onSubmit(name)}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={Input}
              size="lg"
              width="310px"
              name="name"
              placeholder="Name"
              error={errors.name && touched.name}
              autoFocus
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
              >
                Save
              </Button>
            </ButtonsStyle>
          </Form>
        )}
      </Formik>
    </TagCategoryCreatorStyle>
  )
}

TagCategoryCreator.propTypes = {
  closeModal: func.isRequired,
}

export default TagCategoryCreator
