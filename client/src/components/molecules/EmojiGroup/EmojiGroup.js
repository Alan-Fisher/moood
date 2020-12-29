import React from 'react'

import {
  arrayOf, shape, string, number, bool,
} from 'prop-types'
import {
  faPlusCircle, faTimesCircle, faStar, faStarHalfAlt,
} from '@fortawesome/free-solid-svg-icons'
import { EmojiWithText } from '..'
import { EmojiGroupStyle, EmojiGroupCellStyle, AddButtonStyle } from './EmojiGroupStyle'
import { Icon, Badge } from '../../atoms'

const EmojiGroup = ({
  emojis, selectedIds, setFieldValue, openModal, settingsMode, handleDelete,
  extraSelected, handleHalfFavorite, handleFavorite,
}) => {
  const renderIcon = (state) => {
    switch (settingsMode) {
      case 'create':
        break
      case 'favorite':
        if (state === 'favorite') { return <Icon color="#f4df00" icon={faStar} /> }
        break
      case 'half-favorite':
        if (state === 'half-favorite') { return <Icon color="#f4df00" icon={faStarHalfAlt} /> }
        break
      case 'delete':
        return <Icon icon={faTimesCircle} />
      default:
        break
    }
  }

  const handleClick = (id, state) => {
    switch (settingsMode) {
      case 'create':
        handleSelect(id)
        break
      case 'favorite':
        handleFavorite(id, state)
        break
      case 'half-favorite':
        handleHalfFavorite(id, state)
        break
      case 'delete':
        handleDelete(id)
        break
      default:
        handleSelect(id)
        break
    }
  }

  const handleSelect = (id) => {
    let newFeelingsSelection
    if (selectedIds.includes(id)) {
      newFeelingsSelection = selectedIds.filter(item => item !== id)
    } else {
      newFeelingsSelection = [...selectedIds, id]
    }

    setFieldValue(newFeelingsSelection)
  }

  return ( // TODO organize this razvesistaya logika
    <EmojiGroupStyle isShaking={settingsMode === 'delete'}>
      {emojis.map(item => {
        const {
          id, emoji, name, state,
        } = item

        return (
          <EmojiGroupCellStyle
            isSelected={selectedIds.includes(id)}
            onMouseDown={() => handleClick(id, state)}
          >
            <EmojiWithText
              emoji={emoji}
              name={name}
              height="25px"
            />
            {renderIcon(state)}
          </EmojiGroupCellStyle>
        )
      })}
      {openModal && (!settingsMode || settingsMode === 'create') // TODO simplify
      && (
      <AddButtonStyle onClick={openModal}>
        {extraSelected
          ? (
            <Badge color="#f4f4f4" size="lg">
              +
              {extraSelected}
            </Badge>
          )
          : (
            <Icon
              pointer
              size="22px"
              icon={faPlusCircle}
            />
          )}
      </AddButtonStyle>
      )}
    </EmojiGroupStyle>
  )
}

EmojiGroup.propTypes = {
  emojis: arrayOf(shape({ id: number, name: string, emoji: string })),
  chooseMany: bool, // eslint-disable-line react/require-default-props
}

EmojiGroup.defaultProps = {
  emojis: [],
}

export default EmojiGroup
