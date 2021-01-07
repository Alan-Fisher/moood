import { string } from 'prop-types'
import React from 'react'
import { Emoji, Text } from '../../atoms'
import { EmojiWithTextStyle } from './EmojiWithTextStyle'

const EmojiWithText = ({
  name, emoji, height, padding,
}) => (
  <EmojiWithTextStyle padding={padding}>
    <Emoji
      emoji={emoji}
      name={name}
      height={height}
      pointer
    />
    <Text
      margin="5px 0"
      size="xs"
    >
      {name}
    </Text>
  </EmojiWithTextStyle>
)

EmojiWithText.propTypes = {
  padding: string,
}

EmojiWithText.defaultProps = {
  padding: '5px 0 0 0',
}

export default EmojiWithText
