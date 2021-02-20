import styled from 'styled-components/macro'

const SpaceStyle = styled.div`
  display: flex;
  align-items: center;
  ${({ direction }) => direction === 'vertical' && 'flex-direction: column'};
`

export default SpaceStyle
