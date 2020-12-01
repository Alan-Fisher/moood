import styled from 'styled-components/macro'

export const CancelOrSaveHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`

export const LabelStyle = styled.div`
  display: flex;
  align-items: center;
  ${({ onClick }) => (onClick ? 'cursor: pointer;' : '')}
/* 
  >span:last-child {
    width: 20px
  } */
`
