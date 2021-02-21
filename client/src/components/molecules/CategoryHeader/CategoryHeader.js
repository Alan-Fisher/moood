import React from 'react'

import { faAngleDown, faAngleRight, faHistory } from '@fortawesome/free-solid-svg-icons'
import { CategoryHeaderStyle } from './CategoryHeaderStyle'
import { Text, Icon } from '../../atoms'

const CategoryHeader = ({
  name, handleClick, isExtended, isRanged, icon,
}) => {
  const renderIcon = () => { // TODO: DRY
    if (icon) {
      return (
        <Icon
          inline
          icon={icon}
          size="21px"
        />
      )
    }

    if (isExtended !== undefined) {
      return (
        <Icon
          inline
          icon={faAngleDown}
          size="21px"
          rotation={isExtended ? '180' : '0'}
        />
      )
    }

    if (isRanged !== undefined) {
      return (
        <Icon
          inline
          icon={faAngleRight}
          size="21px"
          rotation={isRanged ? '180' : '0'}
        />
      )
    }
  }

  return (
    <CategoryHeaderStyle onClick={handleClick}>
      <Text inline size="xl">
        {name}
      </Text>
      {renderIcon()}
    </CategoryHeaderStyle>
  )
}

CategoryHeader.propTypes = {
}

CategoryHeader.defaultProps = {
}

export default CategoryHeader
