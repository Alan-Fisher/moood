import styled from 'styled-components/macro'

export const TimelineStyle = styled.div`
  height: 100%;
  display: block;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
`

export const CardsStyle = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  padding: 15px 10px;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`
