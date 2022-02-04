import styled from 'styled-components';

export const ContentBox = styled.div`
    background-color: ${({theme}) => theme.bgc };
    text-align: center;
    display: grid;
    grid-template-rows: ${props => props.GTRow ? props.GTRow : "1.3fr 3fr .5fr" };
    grid-template-columns: 1fr;
    justify-items: center;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
`;