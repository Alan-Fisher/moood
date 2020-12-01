import styled from 'styled-components/macro'

export const ExtendedFeelingsStyle = styled.div`
`

export const TabsStyle = styled.div`
  display:flex;
  justify-content: space-around;
`

export const TabStyle = styled.div`
  width: 100%;
  height: 35px;
  display: grid;
  place-items: center;
  ${({ isActive }) => (isActive ? 'background: #eee;' : '')};
`

export const RowStyle = styled.div`
  width: 100%;
  height: 45px;
  display: grid;
  place-items: center;
  ${({ even }) => (even ? 'background: #fafafa;' : '')};
  ${({ isSelected }) => (isSelected ? 'background: #ddd;' : '')};
`

export const ListStyle = styled.div`
  height: ${window.innerHeight - 90}px; 
  /* height: 600px; */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`
