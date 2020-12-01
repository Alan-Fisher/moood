import styled from 'styled-components/macro'

export const EmojiGroupStyle = styled.div`
  margin: 0 5px 5px;
  display: grid;
  grid-template-columns: repeat(5, 70px);
  grid-template-rows: 1fr 1fr;
  gap: 5px 5px;

  ${({ isShaking }) => isShaking && `
  > div:nth-child(2n) {
      animation-name: keyframes1;
      animation-iteration-count: infinite;
      animation-delay: -.75s; animation-duration: .25s;
      transform-origin: 50% 10%;
    }

    > div:nth-child(2n-1) {
      animation-name: keyframes2;
      animation-iteration-count: infinite;
      animation-delay: -.75s; animation-duration: .25s;
      animation-direction: alternate;
      transform-origin: 30% 5%;
    }

    @keyframes keyframes1 {
      0% {
        transform: rotate(-1deg);
        animation-timing-function: ease-in;
      }

      50% {
        transform: rotate(1.5deg);
        animation-timing-function: ease-out;
      }
    }

    @keyframes keyframes2 {
      0% {
        transform: rotate(1deg);
        animation-timing-function: ease-in;
      }

      50% {
        transform: rotate(-1.5deg);
        animation-timing-function: ease-out;
      }
    }
  `}
`

export const EmojiGroupCellStyle = styled.div`
  position: relative;
  cursor: pointer;
  width: ${({ width }) => width};
  /* ${({ isSelected }) => (isSelected ? 'background: #242424' : '')}; // dark */;
  ${({ isSelected }) => (isSelected ? 'background: #f4f4f4' : '')}; 
  border-radius: 6px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  >span {
    position: absolute;
    left: 15px;
    top: 0px;
  }
`

export const AddButtonStyle = styled.div`
  cursor: pointer;
  width: 70px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  display: grid;
  place-items: center;
`
