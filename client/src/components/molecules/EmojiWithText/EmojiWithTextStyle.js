import styled from 'styled-components/macro'

export const EmojiWithTextStyle = styled.div`
  padding: ${({ padding }) => padding};
  text-align: center;
  height: 54px; // TODO: hardcoded?
  user-select: none;
`
