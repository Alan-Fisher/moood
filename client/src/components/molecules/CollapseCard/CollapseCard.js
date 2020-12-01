import React, { useState } from 'react'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { CollapseCardStyle, CardHeaderStyle } from './CollapseCardStyle'
import { Text, Icon } from '../../atoms'

const CollapseCard = ({ name, children }) => {
  const [isCollapsed, setCollapsed] = useState(false)

  return (
    <CollapseCardStyle>
      <CardHeaderStyle
        onClick={() => setCollapsed(oldValue => !oldValue)}
      >
        <Text
          margin="10px"
          size="lg"
        >
          {name}
        </Text>
        <Icon
          margin="10px"
          icon={faChevronDown}
          rotation={isCollapsed ? '0' : '180'}
        />
      </CardHeaderStyle>
      {!isCollapsed && children}
    </CollapseCardStyle>
  )
}

CollapseCard.propTypes = {
}

CollapseCard.defaultProps = {
}

export default CollapseCard
