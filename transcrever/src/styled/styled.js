import styled from 'styled-components';

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
    background-color: #121212;
    height: 65vh;
    width: 100%;
    display: flex; /* Added to help center content */
    align-items: flex-start; /* Align children to the start */
    justify-content: center; /* Center children horizontally */
    position: relative; /* Added to allow positioning the button */
`

export const ContainerText = styled.div`
    color: #fff;
    height: 55vh;
    width: 100%;
    text-align: left;
    overflow:auto; 

    h2 {
        padding: 0.8rem;
    }
    p{
        padding: 0.8rem;
        font-size: 1.2rem;
    }
`

export const ButtonCircle = styled.button`
    position: fixed;
    width: 72px;
    height: 72px;
    background: red;
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
    font-weight: 700;
    font-family: "Monoton", "Text Me One", sans-serif;
    color: #121212;

    &.sub{
        margin-top: -3%;
        margin-bottom: 5rem;
    }
`