import styled from 'styled-components/macro'

const SpinnerStyle = styled.div`
  #cs-loader {
    ${({ size }) => `
      width: ${size}px;
      height: ${size}px;
      padding: ${Math.ceil(size / 8)}px;
      `}
   
    position: relative;
    animation-name: cs-rotate; 
    animation-duration: .7s; 
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    background-image: -webkit-gradient(
      linear,
      left bottom,
      left top,
      color-stop(0.50, transparent),
      color-stop(0.49, black),
      color-stop(0.35, black)
    );
    border-radius:50%;
  }

  #cs-loader .cs-inner-body {
    background:white;
    color:#fff; // TODO: remove overlay color hardcode
    font-size: 20px;
    text-align: center;
    min-height: 100%;
    border-radius:50%;
  }

  @keyframes cs-rotate {
      from {transform: rotate(0deg);}
      to {transform: rotate(360deg);}
  }
`

export default SpinnerStyle
