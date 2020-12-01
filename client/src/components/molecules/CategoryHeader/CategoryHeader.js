import React from 'react'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { CategoryHeaderStyle, ExtendedStyle } from './CategoryHeaderStyle'
import { Text, Icon } from '../../atoms'

const CategoryHeader = ({
  name, handleClick, isExtended,
}) => (
  <CategoryHeaderStyle onClick={handleClick}>
    <Text inline size="xl">
      {name}
    </Text>
    {handleClick
    && (
    <ExtendedStyle>
      <Icon
        inline
        icon={faAngleDown}
        size="21px"
        rotation={isExtended ? '180' : '0'}
      />
    </ExtendedStyle>
    )}
  </CategoryHeaderStyle>
)

CategoryHeader.propTypes = {
}

CategoryHeader.defaultProps = {
}

export default CategoryHeader
