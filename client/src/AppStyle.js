import styled from 'styled-components/macro'

export const AppStyle = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
`

export const WorkaroundWrapperStyle = styled.div` // Workaround for webkit stacking context bug
  position: fixed;
`

export const AppBodyStyle = styled.div`
  width: 1200px;
  height: calc(100vh - 62px); 
  height: calc((var(--vh, 1vh) * 100) - 62px);
  overflow: auto;
  scroll-behavior: smooth;
  /* -webkit-overflow-scrolling: touch; */ // TODO: return when webkit will have no bugs with it
`
