import styled from 'styled-components/macro'

export const EmojiStyle = styled.span`
    ${({ height }) => (height ? `font-size: ${height}` : '')};
    ${({ pointer }) => (pointer ? 'cursor: pointer' : '')};
    margin: ${({ margin }) => margin}
`
