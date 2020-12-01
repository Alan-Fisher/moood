import React from 'react'
import PropTypes from 'prop-types'
import { EmojiStyle } from './EmojiStyle'

const Emoji = ({
  emoji, name, height, pointer, margin, onClick,
}) => (
  <EmojiStyle
    role="img"
    aria-label={name}
    height={height}
    pointer={pointer}
    margin={margin}
    onClick={onClick}
  >
    {emoji}
  </EmojiStyle>
)

Emoji.propTypes = {
  name: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  height: PropTypes.string, // eslint-disable-line react/require-default-props
  pointer: PropTypes.bool,
  margin: PropTypes.string,
  onClick: PropTypes.func, // eslint-disable-line react/require-default-props
}

Emoji.defaultProps = {
  pointer: false,
  margin: '5px',
}

export default Emoji
