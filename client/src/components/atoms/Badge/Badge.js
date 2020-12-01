import React from 'react'
import { string, func, bool } from 'prop-types'

import BadgeStyle from './BadgeStyle'

const Badge = ({
  children, color, size, margin, onClick, pointer,
}) => (
  <BadgeStyle color={color} size={size} margin={margin} onClick={onClick} pointer={pointer}>
    {children}
  </BadgeStyle>
)

Badge.propTypes = {
  children: string.isRequired,
  color: string,
  size: string,
  margin: string,
  onClick: func,
  pointer: bool,
}

Badge.defaultProps = {
  color: 'black',
  size: 'md',
  margin: '0px',
  onClick: () => {},
  pointer: false,
}

export default Badge
