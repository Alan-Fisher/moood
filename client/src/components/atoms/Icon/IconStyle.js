import styled from 'styled-components/macro'

const IconStyle = styled.span`
  display: inline-block;
  font-size: ${props => props.size};
  color: ${props => props.color};
  ${props => props.pointer && 'cursor: pointer;'}
  margin: ${({ margin }) => margin};
  ${({ width }) => (width ? `width: ${width};` : '')}

  &:hover {
    ${({ pointer }) => pointer && 'opacity: 0.7'};
  }
`

export default IconStyle
