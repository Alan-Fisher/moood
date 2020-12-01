import React from 'react'
import PropTypes from 'prop-types'

import LinkStyle from './LinkStyle'

const Link = ({
  children, onClick, size, color, nowrap, weight, underlined, inline, margin, disabled,
}) => (
  <LinkStyle
    size={size}
    color={color}
    nowrap={nowrap}
    weight={weight}
    onClick={onClick}
    underlined={underlined}
    inline={inline}
    margin={margin}
    disabled={disabled}
  >
    {children}
  </LinkStyle>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  color: PropTypes.oneOf(['blue', 'gray', 'white', 'black', 'green', 'red']),
  nowrap: PropTypes.bool,
  underlined: PropTypes.bool,
  weight: PropTypes.oneOf(['regular', 'light', 'medium', 'bold']),
  onClick: PropTypes.func.isRequired,
  inline: PropTypes.bool,
  margin: PropTypes.string,
  disabled: PropTypes.bool,
}

Link.defaultProps = {
  size: 'md',
  color: 'blue',
  nowrap: false,
  underlined: false,
  weight: 'regular',
  inline: false,
  margin: '5px',
  disabled: false,
}

export default Link
