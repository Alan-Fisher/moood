import React from 'react'

import {
  faPlus, faListUl, faCog, faChartPie,
} from '@fortawesome/free-solid-svg-icons'
import { shape, func } from 'prop-types'
import { MenuBarStyle, MenuItemStyle, MenuItemsStyle } from './MenuBarStyle'
import { Icon, Text } from '../../atoms'
import { MoodModel } from '../../../models'

const MenuBar = ({ history }) => {
  const menuItems = [
    { icon: faPlus, name: 'Create', route: '/create' },
    { icon: faListUl, name: 'Timeline', route: '/timeline' },
    { icon: faChartPie, name: 'Stats', route: '/stats' },
    { icon: faCog, name: 'Settings', route: '/settings' },
  ]

  return (
    <MenuBarStyle>
      <MenuItemsStyle>
        {menuItems.map(menuItem => {
          const { icon, name, route } = menuItem
          const isSelected = history.location.pathname === route

          return (
            <MenuItemStyle
              key={route}
              onClick={() => { MoodModel.clear(); history.push(route) }} // TODO: move model clear to
              isSelected={isSelected}
            >
              <Icon
                margin="0 5px"
                icon={icon}
                // color={isSelected ? '#000' : '#444'} // dark
                color={isSelected ? 'white' : '#444'}
                size="20px"
                inline
              />
              {isSelected
                && (
                  <Text
                    size="lg"
                    color={isSelected ? 'white' : 'black'}
                    // color={isSelected ? 'deepBlack' : 'black'} // dark
                    inline
                  >
                    {name}
                  </Text>
                )}
            </MenuItemStyle>
          )
        })}
      </MenuItemsStyle>
    </MenuBarStyle>
  )
}

MenuBar.propTypes = {
  history: shape({
    push: func.isRequired,
  }).isRequired,
}

export default MenuBar
