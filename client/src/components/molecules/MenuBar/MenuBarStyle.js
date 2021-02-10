import styled from 'styled-components/macro'

export const MenuBarStyle = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 32px;
  width: 336px;
`

export const MenuItemsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  transition: all 0.5s ease-in;
`

export const MenuItemStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  /* ${({ isSelected }) => (isSelected ? 'background: #363636;' : '')} // dark */
  ${({ isSelected }) => (isSelected ? 'background: #444;' : '')} 
  padding: 7px 8px;
  cursor: pointer;
`
