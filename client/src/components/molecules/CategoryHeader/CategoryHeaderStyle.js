import styled from 'styled-components/macro'

export const CategoryHeaderStyle = styled.div`
  display: flex;
  align-items: center;
  ${({ onClick }) => (onClick ? 'cursor: pointer;' : '')}
`
