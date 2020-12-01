import React from 'react'
import { Emoji, Text } from '../../atoms'
import { EmojiWithTextStyle } from './EmojiWithTextStyle'

const EmojiWithText = ({
  name, emoji, height,
}) => (
  <EmojiWithTextStyle>
    <Emoji
      emoji={emoji}
      name={name}
      height={height}
      pointer
    />
    <Text size="xs">
      {name}
    </Text>
  </EmojiWithTextStyle>
)

export default EmojiWithText
