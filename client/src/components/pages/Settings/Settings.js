import React from 'react'
import { withRouter } from 'react-router-dom'
import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import { SettingsStyle } from './SettingsStyle'
import { Button } from '../../atoms'
import { AuthModel } from '../../../models'

const Settings = () => (
  <SettingsStyle>
    <Button
      margin="5px auto"
      onClick={() => AuthModel.logout()}
      outlined
      color="black"
    >
      Log out
    </Button>
  </SettingsStyle>
)

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default withRouter(observer(Settings))
