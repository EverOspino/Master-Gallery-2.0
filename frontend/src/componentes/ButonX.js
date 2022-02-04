import styled from 'styled-components';

export const Buton = styled.button`
    
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 50%;

    &:hover{
        background-color: ${({theme}) => theme.hover };
    }

    &:active{
        transform: scale(90%);
    }

    img {
        height: 100%;
        width: 100%;
        filter: ${({theme}) => theme.colorSvg };
    }
`;