import React from 'react'
import PropTypes from 'prop-types'

import InputStyle from './InputStyle'

const Input = ({
  onChange, onFocus, onBlur, size, width, error, disabled, id, placeholder, value,
  type, name, autoFocus, autoComplete, margin, noBorder,
}) => (
  <InputStyle
    noBorder={noBorder}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    size={size}
    width={width}
    error={error}
    disabled={disabled}
    id={id}
    placeholder={placeholder}
    value={value}
    type={type}
    name={name}
    autoFocus={autoFocus}
    autoComplete={autoComplete}
    margin={margin}
  />
)

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func, // eslint-disable-line react/require-default-props
  onBlur: PropTypes.func, // eslint-disable-line react/require-default-props
  size: PropTypes.oneOf(['md', 'lg', 'xl']),
  width: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string, // eslint-disable-line react/require-default-props
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  autoComplete: PropTypes.oneOf(['on', 'off']),
  margin: PropTypes.string,
}

Input.defaultProps = {
  size: 'md',
  width: 'auto',
  disabled: false,
  placeholder: '',
  type: 'text',
  error: false,
  name: undefined,
  autoFocus: false,
  autoComplete: 'off',
  margin: '5px',
}

export default Input
