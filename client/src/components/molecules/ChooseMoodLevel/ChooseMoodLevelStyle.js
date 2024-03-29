import styled from 'styled-components/macro'

export const ChooseMoodLevelStyle = styled.div`
  margin: 0px 5px 5px;
  display: grid;
  grid-template-columns: repeat(6, 55px);
  gap: 3px;
`

export const CellStyle = styled.div`
  position: relative;
  cursor: pointer;
  text-align: center;
  /* ${({ isSelected }) => (isSelected ? 'background: #242424' : '')};  // dark */; 
  ${({ isSelected }) => (isSelected ? 'background: #f4f4f4' : '')};
  border-radius: 6px;
  padding: 0px 5px;
  width: 45px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`

export const RangeIconStyle = styled.div`
  position: absolute;
  margin: -46px -16px;
`
