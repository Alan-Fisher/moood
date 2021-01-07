import styled from 'styled-components/macro'

export const ChooseMoodLevelRangeStyle = styled.div`
  margin: 0px 5px 5px;
  display: grid;
  grid-template-columns: repeat(6, 55px);
  gap: 5px 5px;
`

export const CellStyle = styled.div`
  cursor: pointer;
  text-align: center;
  /* ${({ isSelected }) => (isSelected ? 'background: #242424' : '')};  // dark */; 
  ${({ isSelected }) => (isSelected ? 'background: #f4f4f4' : '')};
  border-radius: 6px;
  padding: 0px 5px;
  width: 50px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`
