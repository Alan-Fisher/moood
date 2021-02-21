import styled from 'styled-components/macro'

export const StatsStyle = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
  scroll-behavior: smooth;
`

export const LineBackgroundStyle = styled.div`
  border-radius: 4px; 
  margin: 8px; 
  height: 7px; 
  position: relative;
  background: ${({ isActive }) => (isActive ? '#ddd' : '#eee')}; 
`

export const LineStyle = styled.div`
  z-index: 20;
  position: absolute;
  height: 7px;
`

export const LineInfoStyle = styled.div`
  z-index: 20;
  bottom: -6px;
  left: -3px;
  position: absolute;
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const FeelingsLineStyle = styled.div`
  z-index: 10;
  position: absolute;
  height: 1px;
  bottom: 3px;

  ${({ isPositive }) => (isPositive ? `
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0px;
      bottom: -1px;
      height: 3px;
      width: 1px;
      background: #12cc63;
      border-radius: 0 5px 5px 0;
    } 
  `
    : `
  &:before {
    content: '';
    display: block;
    position: absolute;
    bottom: -1px;
    height: 3px;
    width: 1px;
    background: #798EFF;
    border-radius: 5px 0 0 5px;
  }`)}
`
