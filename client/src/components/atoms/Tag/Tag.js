import React from 'react'
import { string } from 'prop-types'
import { Text } from '..'

import TagStyle from './TagStyle'

const Tag = ({ name }) => (
  <TagStyle>
    <Text>
      {name}
    </Text>
  </TagStyle>
)

Tag.propTypes = {
  name: string.isRequired, // eslint-disable-line react/require-default-props
}

export default Tag
