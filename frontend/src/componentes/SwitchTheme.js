import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';

export default function SwitchTheme( props ) {

    useEffect( () =>{
        const swi = document.getElementById('switchTheme');
        if ( localStorage.getItem('theme') == 'dark' ) {
            swi.checked = 'checked';
            props.setTheme('dark');
        }
    }, [] );
    
    const changeMode = (e) => {
        if( props.theme === 'light' ) {
            props.setTheme('dark');
            localStorage.setItem('theme', 'dark');
        }else{
            props.setTheme('light');
            localStorage.setItem('theme', 'light');
        }
    }

    return (<>
        <Formulario >
            <Form.Check 
                type="switch"
                id="switchTheme"
                onChange={(e) => {changeMode(e);}}
            />
        </Formulario>
    </>);
}

const Formulario = styled(Form)`
    position: absolute;
    z-index: 5;
    top: 0px;
    right: 0px;
    width: 80px;
    height: 60px;
    background-color: white;
    border-radius: 0px 0px 0px 80%;
    box-shadow: -2px 2px 10px #444;
    background-color: ${({theme}) => theme.bgc };

    & #switchTheme{
        position: absolute;
        width: 40px;
        height: 20px;
        top: 10px;
        right: 10px;
        
        &:checked{
            background-color: #8142FF;
        }
    }
`;

