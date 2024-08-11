import styled, {keyframes} from 'styled-components';

const pulse = keyframes`
    0% {transform: translate(0); opacity: 1; content: "";}
    33% {transform: translate(5px); opacity: 0.5; content: ".";}
    66% {transform: translate(-5px); opacity: 0.5; content: "..";}
    100% {transform: translate(0); opacity: 1; content: "...";}
`

export const LoadingDots = styled.span`
    display: inline-block;
    font-size: 1.8rem;
    &:after {
        content: '';
        animation: ${pulse} 1.2s infinite;
    }
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
    align-items: center;
    background-color: #fff;
    position: relative; 
`

export const ContainerFromText = styled.div`
    background-color: #2e2e2e;
    height: 65vh;
    width: 100%;
    display: flex; /* Added to help center content */
    align-items: flex-start; /* Align children to the start */
    justify-content: center; /* Center children horizontally */
    position: relative; /* Added to allow positioning the button */
    flex-direction: column;
    h2 {
        color: #f06;
        font-family: "Silkscreen", sans-serif;
        font-weight: 400;
        font-style: normal;
        font-size: 1.8rem;
        margin-top: -65%;
        margin-left: 15%;
        position: fixed;
    }
`

export const ContainerText = styled.div`
    color: #fff;
    height: 52vh;
    width: 100%;
    margin-top: 30%;
    text-align: left;
    overflow:auto; 
    background-color: #2e2e2e;
    border-radius: 0px;
    scrollbar-width: thin;  
    scrollbar-color: #9e9e9e #3a3f50;
    color: #efefec;


    h2 {
        font-family: "Roboto Mono", monospace;
        font-optical-sizing: auto;
        padding: 0.8rem;
    }
    p{  
        margin-block-start: 0.2em;
        font-family: "Roboto Mono", monospace;
        font-optical-sizing: auto;
        padding: 0.8rem;
        font-size: 1.2rem;
    }
`

export const ButtonCircle = styled.button`
    position: fixed;
    width: 72px;
    height: 72px;
    background: #f06;
    border: 2px solid #fff;
    border-radius: 70px;
    cursor: pointer;
    top: 29%; /* Positioned at the center of the container */
    left: 38%; /* Centered horizontally */

    text-align: center;
    p{
        margin-top: -4%;
        font-size: 2.4rem;
        font-weight: 700;
    }
    &:disabled,
    &[disabled]{
    border: 1px solid #999999;
    background-color: rgba(255,0,102,.7);
    color: #666666;
    cursor: none;
    }
    /* &:before {
        content: " ";
        position: absolute;
        z-index: -1;
        top: -10px;
        left: -11px;
        right: 5px;
        bottom: 87px;
        border: 56px solid #252523;
        border-radius: 50%;
} */
`
    


export const Title = styled.h1`
    font-size: 2.4rem;
    text-align: center;
    font-family: "Silkscreen", sans-serif;
    font-weight: 400;
    font-style: normal;
    color: #121212;

    &.sub{
        margin-top: -3%;
        margin-bottom: 5rem;
    }
`