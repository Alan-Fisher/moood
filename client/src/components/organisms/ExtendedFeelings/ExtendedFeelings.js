import React, { useState } from 'react'

import {
  ExtendedFeelingsStyle, TabsStyle, TabStyle, RowStyle, ListStyle,
} from './ExtendedFeelingsStyle'
import { Text } from '../../atoms'
import { CancelOrSaveHeader } from '../../molecules'
import feelings from '../../../common/feelings.json'

const ExtendedFeelings = ({ outsideSelectedIds, saveSelection, closeModal }) => {
  const [openedTab, setOpenedTab] = useState(1)
  const [selectedIds, setSelectedIds] = useState([...outsideSelectedIds])

  const tabs = [
    { id: 1, name: 'Positive', onClick: () => setOpenedTab(1) },
    { id: 2, name: 'Negative', onClick: () => setOpenedTab(2) },
  ]

  function renderList() {
    const listItems = openedTab === 1 ? feelings.positive : feelings.negative

    return listItems.map((feeling, i) => {
      const { name, id } = feeling

      return (
        <RowStyle
          onClick={() => handleListItemClick(id)}
          even={(i + 1) % 2 === 0}
          isSelected={selectedIds.includes(id)}
          key={id}
        >
          <Text size="lg">{name}</Text>
        </RowStyle>
      )
    })
  }

  function handleListItemClick(id) {
    if (selectedIds.includes(id)) {
      setSelectedIds(oldArray => oldArray.filter(item => item !== id))
    } else {
      setSelectedIds(oldArray => [...oldArray, id])
    }
  }

  return (
    <ExtendedFeelingsStyle>
      <CancelOrSaveHeader
        onCancel={() => closeModal()}
        onSave={() => saveSelection('feelingIds', selectedIds)}
        headerText="Select feelings"
      />
      <TabsStyle>
        {tabs.map(tab => {
          const { id, name, onClick } = tab

          return (
            <TabStyle
              key={id}
              isActive={openedTab === id}
              onClick={onClick}
            >
              <Text
                size="lg"
              >
                {name}
              </Text>
            </TabStyle>
          )
        })}

      </TabsStyle>
      <ListStyle key={openedTab}>
        {renderList()}
      </ListStyle>
    </ExtendedFeelingsStyle>
  )
}

ExtendedFeelings.propTypes = {
}

ExtendedFeelings.defaultProps = {
}

export default ExtendedFeelings
