import styled from 'styled-components/macro'

const displayFontSize = prop => {
  switch (prop) {
    case 'sm':
      return ({ theme }) => theme.fontSizes.sm
    case 'md':
      return ({ theme }) => theme.fontSizes.md
    case 'lg':
      return ({ theme }) => theme.fontSizes.lg
    case 'xl':
      return ({ theme }) => theme.fontSizes.xl
    case 'xxl':
      return ({ theme }) => theme.fontSizes.xxxl
    default:
      return ({ theme }) => theme.fontSizes.md
  }
}

const displayLineHeight = prop => {
  switch (prop) {
    case 'sm':
      return ({ theme }) => theme.lineHeights.sm
    case 'md':
      return ({ theme }) => theme.lineHeights.md
    case 'lg':
      return ({ theme }) => theme.lineHeights.lg
    case 'xl':
      return ({ theme }) => theme.lineHeights.xl
    case 'xxl':
      return ({ theme }) => theme.lineHeights.xxxl
    default:
      return ({ theme }) => theme.lineHeights.md
  }
}

const displayWeight = prop => {
  switch (prop) {
    case 'regular':
      return ({ theme }) => theme.fontWeights.regular
    case 'light':
      return ({ theme }) => theme.fontWeights.light
    case 'medium':
      return ({ theme }) => theme.fontWeights.medium
    case 'bold':
      return ({ theme }) => theme.fontWeights.bold
    default:
      return ({ theme }) => theme.fontWeights.regular
  }
}

const displayType = prop => {
  switch (prop) {
    case 'blue':
      return ({ theme }) => theme.colors.blue
    case 'gray':
      return ({ theme }) => theme.colors.gray
    case 'white':
      return ({ theme }) => theme.colors.white
    case 'green':
      return ({ theme }) => theme.colors.green
    case 'red':
      return ({ theme }) => theme.colors.red
    case 'black':
      return ({ theme }) => theme.colors.black
    default:
      return ({ theme }) => theme.colors.blue
  }
}

const LinkStyle = styled.a`
    margin: ${({ margin }) => margin};
    cursor: pointer;
    text-decoration: underline;
    ${({ underlined }) => (underlined ? '' : 'text-decoration-color: transparent;')};
    transition: 1s;
    display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: ${({ size }) => displayFontSize(size)};
    font-weight: ${({ weight }) => displayWeight(weight)};
    line-height: ${({ size }) => displayLineHeight(size)};
    color: ${({ color }) => displayType(color)};
    ${props => props.nowrap && 'white-space: nowrap;'}



    :hover {
        text-decoration-color: currentcolor;
    }

    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;


`

export default LinkStyle
