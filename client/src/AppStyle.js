import styled from 'styled-components/macro'

export const AppStyle = styled.div`
  max-width: 400px;
  margin: 0 auto;
  height: 100%;
`

export const AppBodyStyle = styled.div`
  width: 400px;
  height: calc(100vh - 62px); 
  height: calc((var(--vh, 1vh) * 100) - 62px);
  position: fixed;
  overflow: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`
