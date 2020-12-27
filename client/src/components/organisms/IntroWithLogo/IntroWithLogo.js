import React, { useEffect, useState } from 'react'

import { IntroWithLogoStyle } from './IntroWithLogoStyle'
import {
  Text, Emoji,
} from '../../atoms'

const IntroWithLogo = () => {
  const [lineItem, setLineItem] = useState(0)

  const lines = [
    ['🤩', '🤩', '🤩'],
    ['😬', '😏', '😀'],
    ['🍩', '🥃', '🍰'],
    ['🧘🏻‍♀️', '🤸🏻‍♀️', '🏃🏻‍♀️'],
    ['🌃', '🎇', '🌉'],
    ['🙈', '🙉', '🙊'],
    ['🚴🏻‍♂️', '🧗🏻‍♀️', '⛷'],
    ['😼', '😺', '😼'],
    ['🍺', '🍺', '🍺'],
    ['🥑', '🍌', '🍏'],
  ]

  useEffect(() => {
    setTimeout(() => setLineItem(lineItem < lines.length - 1 ? lineItem + 1 : 0), 1000)
  }, [lineItem, lines.length])

  const getEmoji = (i) => lines[lineItem][i]

  return (
    <IntroWithLogoStyle>
      <Text size="xxl">
        M
        <Emoji margin="0 2px 0 3px" emoji={getEmoji(0)} />
        <Emoji margin="2px" emoji={getEmoji(1)} />
        <Emoji margin="0 3px 0 2px" emoji={getEmoji(2)} />
        D
      </Text>
    </IntroWithLogoStyle>
  )
}

IntroWithLogo.propTypes = {
}

IntroWithLogo.defaultProps = {
}

export default IntroWithLogo
