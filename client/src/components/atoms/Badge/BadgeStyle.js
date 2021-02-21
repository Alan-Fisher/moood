import styled from 'styled-components/macro'

const displaySize = prop => {
  switch (prop) {
    case 'sm':
      return ({ theme }) => theme.fontSizes.sm
    case 'md':
      return ({ theme }) => theme.fontSizes.md
    case 'lg':
      return ({ theme }) => theme.fontSizes.lg
    default:
      return ({ theme }) => theme.fontSizes.md
  }
}

const displayPadding = prop => {
  switch (prop) {
    case 'sm':
      return '1px 2px'
    case 'md':
      return '3px 4px'
    case 'lg':
      return '5px 8px'
    default:
      return '8px 11px'
  }
}

const BadgeStyle = styled.span`
  margin: ${({ margin }) => margin};
  text-align: center;
  border-radius: 20px;
  line-height: 20px;
  display: inline-block;
  user-select: none;

  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  color: #a3a3a3;
  background: ${({ color }) => color};
  min-width: ${({ size }) => displaySize(size)};
  font-size: ${({ size }) => displaySize(size)};
  padding: ${({ size }) => displayPadding(size)};

  ${({ pointer }) => pointer && 'cursor: pointer;'}
`

export default BadgeStyle
