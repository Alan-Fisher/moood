import styled from 'styled-components/macro'

export const TimelineStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

export const CardsStyle = styled.div`
  display: flex;
  flex-flow: column;
  position: relative;
  padding: 15px 10px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`
