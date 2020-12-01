import styled from 'styled-components'

export const FullModalStyle = styled.div`
    position: fixed;
    left: 0px;
    top: 0;
    width: 100%;
    height: 100%;
    /* background: black; // dark */
    background: white;
    z-index: 100;

    > span:first-child {
        position: absolute;
        top: 20px;
        right: 40px;
    }

    /* & {
        animation-duration: 0.5s;
        animation-name: slideFromRight;
    }
    
    @keyframes slideFromRight {
        0% { left: 400px; opacity: 0% }
        100% { left: 0px; opacity: 100%}
       } */
`
