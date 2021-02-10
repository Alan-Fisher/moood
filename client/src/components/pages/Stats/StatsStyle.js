import styled from 'styled-components/macro'

export const StatsStyle = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LineStyle = styled.div`
  margin: 5px;
  background: #ddd;
  width: 100%;
  height: 3px;
  
  > div { 
    z-index: 20;
    position: absolute;
    background: green;
    width: 100%;
    height: 3px;
    transform: scale(0.2; 1) translate(-50%; 0%);
  }
`
