import styled from 'styled-components/macro'

const displayTextSize = prop => {
  switch (prop) {
    case 'md':
      return ({ theme }) => theme.fontSizes.md
    case 'lg':
      return ({ theme }) => theme.fontSizes.lg
    case 'xl':
      return ({ theme }) => theme.fontSizes.xl
    default:
      return ({ theme }) => theme.fontSizes.md
  }
}

const displayPadding = prop => {
  switch (prop) {
    case 'md':
      return '7px 8px'
    case 'lg':
      return '11px 12px'
    case 'xl':
      return '15px 16px'

    default:
      return '7px 8px'
  }
}

const displayBorderRadius = prop => {
  switch (prop) {
    case 'md':
      return '4px'
    case 'lg':
      return '6px'
    case 'xl':
      return '8px'
    default:
      return '4px'
  }
}

const TextAreaStyle = styled.textarea`
    margin: ${({ margin }) => margin};
    resize: none;
    display: block;
    outline: none !important;
    border-radius: ${({ size }) => displayBorderRadius(size)};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ size }) => displayTextSize(size)};
    padding: ${({ size }) => displayPadding(size)};


    border: 1px solid #444;
    width: ${({ width }) => (width ? `${width}` : 'auto')};
    height: ${({ height }) => (height ? `${height}` : 'auto')};
    color: #444;

    ${({ error, theme }) => (error && `border-color: ${theme.colors.red};`)}
    /*background: #1C1C1C; // dark */

    ::placeholder {
      color: #cccccc
    }
`

export default TextAreaStyle
