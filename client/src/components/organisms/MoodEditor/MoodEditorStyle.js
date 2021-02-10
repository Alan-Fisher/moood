import styled from 'styled-components/macro'

export const MoodEditorStyle = styled.div`
  height: calc(100vh - 50px);  
  height: calc((var(--vh, 1vh) * 100) - 50px); // TODO: harcoded? 
  overflow-y: auto;
  scroll-behavior: smooth;
`
