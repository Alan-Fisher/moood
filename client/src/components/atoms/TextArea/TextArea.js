import React from 'react'
import PropTypes from 'prop-types'

import TextAreaStyle from './TextAreaStyle'

const TextArea = ({
  margin, onChange, onFocus, onBlur, size, width, height, error, disabled, id,
  placeholder, value, autoFocus, name, rows,
}) => (
  <TextAreaStyle
    margin={margin}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    size={size}
    width={width}
    height={height}
    error={error}
    disabled={disabled}
    id={id}
    placeholder={placeholder}
    value={value}
    name={name}
    autoFocus={autoFocus}
    rows={rows}
  />
)

TextArea.propTypes = {
  margin: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func, // eslint-disable-line react/require-default-props
  onBlur: PropTypes.func, // eslint-disable-line react/require-default-props
  size: PropTypes.oneOf(['md', 'lg', 'xl']),
  width: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string, // eslint-disable-line react/require-default-props
  placeholder: PropTypes.string, // eslint-disable-line react/require-default-props
  value: PropTypes.string.isRequired,
  error: PropTypes.bool,
  height: PropTypes.string,
  name: PropTypes.string,
  autoFocus: PropTypes.bool,
  rows: PropTypes.number, // eslint-disable-line react/require-default-props
}

TextArea.defaultProps = {
  margin: '5px',
  size: 'md',
  width: 'auto',
  disabled: false,
  error: false,
  height: 'auto',
  name: undefined,
  autoFocus: false,
}

export default TextArea
