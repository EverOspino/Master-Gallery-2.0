import styled from 'styled-components';

export const Input = styled.input`
    display: block;
    border: none;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    background-color: ${({theme}) => theme.bgcInput };
    color: ${({theme}) => theme.text };

    @media screen and ( max-width: 575px) {
        width: 75vw;
        height: 10vw;
        margin: 8vw;
        padding: 5px;
        font-size: 22px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        width: 38vw;
        height: 4vw;
        margin: 22px;
        padding: 5px;
        font-size: 20px;
    }
    @media screen and ( min-width: 1200px) {
        width: 30vh;
        margin: 20px;
        padding: 5px;
    }
    @media screen and (min-width: 1900px) {
        width: 26vh;
        height: 2.8vh;
        margin: 22px;
        padding: 5px;
        font-size: 20px;
    }
`;