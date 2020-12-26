import React, { useState } from 'react'

import { withRouter } from 'react-router-dom'
import { Form, Formik, Field } from 'formik'
import * as Yup from 'yup'
import { func, shape } from 'prop-types'
import {
  LoginStyle, ButtonsStyle,
} from './LoginStyle'
import { Button, Input, Text } from '../../atoms'
import { AuthModel } from '../../../models'
import { parseQueryString } from '../../../common/helpers'

const Login = ({ history }) => {
  const [formError, setFormError] = useState(undefined)
  const onSubmit = ({ email, password }) => {
    AuthModel.login(email, password)
      .then(() => handleRedirectAfterLogin())
      .catch(({ response }) => handleLoginError(response))
  }

  const handleLoginError = (response) => {
    if (response.status === 401) { setFormError('Wrong credentials') }
  }

  const handleRedirectAfterLogin = () => {
    const queries = parseQueryString(window.location.search)
    const redirectUrl = queries.u
    history.push(redirectUrl || '/create')
  }

  return (
    <LoginStyle>
      <Formik
        enableReinitialize
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
          })
        }
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              as={Input}
              size="lg"
              width="310px"
              // type="email"
              name="email"
              placeholder="Email"
              error={errors.email && touched.email}
              autoFocus
            />
            <Field
              as={Input}
              size="lg"
              width="310px"
              type="password"
              name="password"
              placeholder="Password"
              error={errors.password && touched.password}
            />
            <ButtonsStyle>
              <Text color="red">{formError}</Text>
              <Button
                inline
                outlined
                size="lg"
                color="black"
                type="submit"
              >
                Login
              </Button>
            </ButtonsStyle>
          </Form>
        )}
      </Formik>
    </LoginStyle>
  )
}

Login.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
}

export default withRouter(Login)
