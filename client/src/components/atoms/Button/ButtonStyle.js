import styled from 'styled-components/macro'

const displayBorder = prop => {
  switch (prop) {
    case 'green':
      return '1px solid rgba(32, 196, 116, 0.5)'
    case 'blue':
      return '1px solid rgba(121, 142, 255, 0.5)'
    case 'red':
      return '1px solid rgba(251, 99, 112, 0.5)'
    case 'gray':
      return '1px solid rgba(187, 187, 187, 0.5)'
    case 'black':
      return '1px solid #444'
    default:
      return '1px solid rgba(187, 187, 187, 0.5)'
  }
}

const displayBoxShadow = prop => {
  const sizes = '0px 0px 0px 3px'
  switch (prop) {
    case 'green':
      return `${sizes} rgba(32, 196, 116, 0.4)`
    case 'blue':
      return `${sizes} rgba(121, 142, 255, 0.4)`
    case 'red':
      return `${sizes} rgba(251, 99, 112, 0.4)`
    case 'gray':
      return `${sizes} rgba(187, 187, 187, 0.4)`
    default:
      return `${sizes} rgba(187, 187, 187, 0.4)`
  }
}

const displayTextSize = (prop, theme) => {
  switch (prop) {
    case 'sm':
      return theme.fontSizes.sm
    case 'md':
      return theme.fontSizes.md
    case 'lg':
      return theme.fontSizes.lg
    default:
      return theme.fontSizes.md
  }
}

const displayPadding = prop => {
  switch (prop) {
    case 'sm':
      return '5px 13px'
    case 'md':
      return '8px 15px'
    case 'lg':
      return '11px 17px'
    default:
      return '8px 15px'
  }
}

const ButtonStyle = styled.button`
${({
    theme, inline, outlined, color, disabled, size, loading, margin, float,
  }) => `
  
  margin: ${margin};
  position: relative;
  ${float ? `float: ${float};` : ''} 
  outline: none;
  border-radius: 6px;
  line-height: 15px;
  display: ${inline ? 'inline-block' : 'flex'};
  flex-direction: row;
  align-items: center;

  > .button_icon {
    margin-right: 8px;
  }

  font-family: ${theme.fontFamily};
  font-weight: ${theme.fontWeights.medium};
  cursor: ${disabled ? 'default' : 'pointer'};
  color: ${!outlined ? '#ffffff' : theme.colors[color]};
  background-color: ${!outlined ? theme.colors[color] : 'inherit'};
  font-size: ${displayTextSize(size, theme)};
  padding: ${displayPadding(size)};
  border: ${displayBorder(color)};
 
  &:hover {
    background-color: ${((!outlined && !disabled) ? theme.darkColors[color] : 'transperent')}
  }  

  &:focus {
    box-shadow: ${displayBoxShadow(color)};
  }

  ${disabled && !loading ? 'opacity: 0.65;' : ''}
  `}
`

export default ButtonStyle
