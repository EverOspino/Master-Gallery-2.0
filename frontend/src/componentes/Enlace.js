import styled from 'styled-components';

export const Enlace = styled.a`
    color: #49C1DB;
    font-family: 'Roboto Slab', serif;
    cursor: pointer;
    text-decoration: none;

    @media screen and ( max-width: 575px) {
        font-size: 20px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1023px) {
        font-size: 18px;
    }
    @media screen and ( min-width: 1024px) {
        font-size: 13px;
    }
    @media screen and (min-width: 1900px) {
        font-size: 20px;
    }

    &:hover {
        color: #35879b;
        text-decoration: underline;
    }
`;