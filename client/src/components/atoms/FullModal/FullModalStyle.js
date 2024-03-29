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
    display: flex;
    justify-content: center;

    & {
        animation-duration: 0.5s;
        animation-name: slideFromRight;
    }

    @keyframes slideFromRight {
        0% { top: 800px; opacity: 0% }
        100% { top: 0px; opacity: 100%}
    }
`

export const BodyStyle = styled.div`
    max-width: 500px;
    width: 100%;
`
