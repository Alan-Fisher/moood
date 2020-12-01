import React from 'react'
import PropTypes, { string } from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import IconStyle from './IconStyle'

const Icon = ({
  icon, size, color, onClick, pointer, rotation, id, margin, title, width,
}) => (
  <IconStyle
    onClick={onClick}
    size={size}
    color={color}
    pointer={pointer}
    id={id}
    margin={margin}
    title={title}
    width={width}
  >
    <FontAwesomeIcon icon={icon} rotation={rotation} />
  </IconStyle>
)

Icon.propTypes = {
  onClick: PropTypes.func, // eslint-disable-line react/require-default-props
  size: PropTypes.string,
  icon: PropTypes.shape({
    icon: PropTypes.array,
    iconName: PropTypes.string,
    prefix: PropTypes.string,
  }).isRequired,
  color: PropTypes.string,
  pointer: PropTypes.bool,
  rotation: PropTypes.oneOf([90, 180, 270]), // eslint-disable-line react/require-default-props
  id: PropTypes.string, // eslint-disable-line react/require-default-props
  margin: PropTypes.string,
  title: PropTypes.string, // eslint-disable-line react/require-default-props
  width: string, // eslint-disable-line react/require-default-props
}

Icon.defaultProps = {
  size: '15px',
  color: '#444444',
  pointer: false,
  margin: '0px',
}

export default Icon
