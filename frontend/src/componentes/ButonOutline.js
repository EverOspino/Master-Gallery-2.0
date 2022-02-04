import styled from 'styled-components';

export const ButonOutline = styled.button`
    background-color: transparent;
    color: ${({theme}) => theme.text };
    font-family: 'PT Serif', serif;
    border-radius: 50px;
    border: 2px solid #8142FF;
    box-shadow: 1px 1px 5px #424242;
    cursor: pointer;
    transition: color .5s;
    transition: background-color .5s;

    @media screen and ( max-width: 575px) {
        margin: 20px 0px;
        padding: 10px 20px;
        font-size: 18px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        margin: 18px 0px;
        padding: 10px 20px;
        font-size: 16px;
    }
    @media screen and ( min-width: 1200px) {
        margin: 10px 0px;
        padding: 5px 10px;
    }
    @media screen and (min-width: 1900px) {
        margin: 18px 0px;
        padding: 10px 20px;
        font-size: 18px;
    }

    &:hover {
        background-color: #8142FF;
        color: white;
    }

    &:active {
        transform: scale(96%);
    }
`;