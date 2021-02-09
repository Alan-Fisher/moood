import { string } from 'prop-types'
import React from 'react'

import SpaceStyle from './SpaceStyle'

const Space = ({
  direction, size, children, style, onClick,
}) => (
  <SpaceStyle onClick={onClick} style={style} direction={direction} size={size}>
    {children}
  </SpaceStyle>
)

Space.propTypes = {
  direction: string,
}

Space.defaultProps = {
  direction: 'horizontal',
}

export default Space
