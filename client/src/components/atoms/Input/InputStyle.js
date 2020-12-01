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
      return '10px 11px'
    case 'xl':
      return '13px 14px'

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

const InputStyle = styled.input`
    -webkit-appearance: none;
    -webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
    margin: ${({ margin }) => margin};
    display: block;
    outline: none !important;
    ${({ size, noBorder }) => (!noBorder ? `border-radius: ${displayBorderRadius(size)}}` : '')};
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: ${({ size }) => displayTextSize(size)};
    padding: ${({ size }) => displayPadding(size)};


    border: ${({ noBorder }) => (noBorder ? 'none' : '1px solid #444')};
    ${({ noBorder }) => (noBorder ? 'border-bottom: 1px solid #444' : '')};
    width: ${props => (props.width ? `${props.width}` : 'auto')};
    /* color: #888; // dark */
    color: #444; 

    ${({ error, theme }) => (error && `border-color: ${theme.colors.red};`)}
    /* background: #1C1C1C; /* // dark */
    ::placeholder {
      /* color: #444; // dark */
      color: #cccccc 
    }

`

export default InputStyle
