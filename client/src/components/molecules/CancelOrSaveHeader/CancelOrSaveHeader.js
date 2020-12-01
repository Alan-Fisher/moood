import React from 'react'

import {
  faStar, faStarHalfAlt, faTrashAlt, faGlasses,
} from '@fortawesome/free-solid-svg-icons'
import { CancelOrSaveHeaderStyle, LabelStyle } from './CancelOrSaveHeaderStyle'
import { Text, Link, Icon } from '../../atoms'

const CancelOrSaveHeader = ({
  onCancel, onSave, headerText, settingsMode, switchSettingsMode,
}) => {
  function renderSettingsIcon() {
    let icon
    switch (settingsMode) {
      case 'create':
        icon = faGlasses
        break
      case 'favorite':
        icon = faStar
        break
      case 'half-favorite':
        icon = faStarHalfAlt
        break
      case 'delete':
        icon = faTrashAlt
        break
      default:
        icon = faGlasses
    }

    return (
      <Icon
        pointer
        size="18px"
        icon={icon}
        width="20px"
      />
    )
  }

  return (
    <CancelOrSaveHeaderStyle>
      <Link onClick={onCancel} size="lg" color="black">
        Cancel
      </Link>
      <LabelStyle onClick={switchSettingsMode}>
        <Text size="lg">
          {headerText}
        </Text>
        {switchSettingsMode && renderSettingsIcon()}
      </LabelStyle>
      <Link onClick={onSave} size="lg" color="black">
        Save
      </Link>
    </CancelOrSaveHeaderStyle>
  )
}

CancelOrSaveHeader.propTypes = {
}

CancelOrSaveHeader.defaultProps = {
}

export default CancelOrSaveHeader
