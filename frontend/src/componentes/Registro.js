import React, { useState } from 'react';

//Styled Components
import styled from 'styled-components';
import { Background } from './Background';
import { Input } from './Input';
import { ButonOutline } from './ButonOutline';
import { Enlace } from './Enlace';
import { ContentBox } from './ContentBox';

//Documentos
import validarFormulario from './validaciones/validadFormulario';

export default function Registro()  {
    const [registerNombre, setRegisterNombre] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerContraseña, setRegisterContraseña] = useState("");
    const [registerContraseña2, setRegisterContraseña2] = useState("");

    //funcion que registra un usuario
    const registrarUsuario = async (e) => {
        e.preventDefault();
        const validacion = validarFormulario('registro', registerEmail, registerContraseña, registerNombre, registerContraseña2);
        if (validacion.ok) {
            const usuario = {
                name: registerNombre,
                email: registerEmail,
                password: registerContraseña,
            }

            const res = await fetch( 'http://localhost:3001/api/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuario)} );
            const data = await res.json();
            if(data.ok){
                sessionStorage.setItem('usuario', registerEmail);
                sessionStorage.setItem('nombre', registerNombre);

                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('password').value = '';
                document.getElementById('password2').value = '';

                window.location.href = './respuesta';
            } else{
                document.getElementById('errorMessage').innerHTML = data.message;
                console.log(data.message);
            }
            //const envioCorreo = await sendEmailVerification(user);

        } else{
            document.getElementById('errorMessage').innerHTML = validacion.mensaje;
            //alert(validacion.mensaje);
        }
    };
    

    return(
        <Background>
            <Content GTRow = '1fr 3.5fr .5fr'>
                <Logo>
                    <Tittle>CREA TU CUENTA</Tittle>
                </Logo>
                <form>
                    <Input id='name' type='text' 
                    onChange={(event) => {setRegisterNombre(event.target.value)}} placeholder='Nombre de Usuario' />
                    
                    <Input id='email' type='email'
                    onChange={(event) => {setRegisterEmail(event.target.value.toLocaleLowerCase())}} placeholder='Correo' required />
                    
                    <Input id='password' type='password'
                    onChange={(event) => {setRegisterContraseña(event.target.value)}} placeholder='Contraseña' required />
                    
                    <Input id='password2' type='password'
                    onChange={(event) => {setRegisterContraseña2(event.target.value)}} placeholder='Confirmar Contraseña' required />
                    
                    <ErrorMessage id='errorMessage'></ErrorMessage>

                    <ButonOutline type='submit' onClick={registrarUsuario}>REGISTRAR</ButonOutline>
                </form>
                <ContenedorEnlace>
                    <Enlace href='/'>Inicia sesión</Enlace>
                </ContenedorEnlace>
            </Content>
        </Background>
    );
}

const Content = styled(ContentBox)`
    @media screen and ( max-width: 575px) {
        width: 94%;
        height: 75%;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1023px) {
        width: 60vw;
        height: 60vw;
    }
    @media screen and ( min-width: 1024px) {
        width: 320px;
    }
    @media screen and (min-width: 1900px) {
        width: 40vh;
    }

`;

const Logo = styled.div`
    grid-row: 1/2;
    align-self: flex-end;
`;

const Tittle = styled.p`
    color: ${({theme}) => theme.text };
    
    @media screen and ( max-width: 575px) {
        font-size: 28px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1023px) {
        font-size: 28px;
    }
    @media screen and ( min-width: 1024px) {
        font-size: 20px;
    }
    @media screen and (min-width: 1900px) {
        font-size: 28px;
    }
`;

const ErrorMessage = styled.p`
    display: block;
    color: red;
    margin-bottom: 10px;
    text-align: center;

    @media screen and ( max-width: 575px) {
        height: 20px;
        font-size: 18px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1023px) {
        height: 20px;
        font-size: 15px;
    }
    @media screen and ( min-width: 1024px) {
        height: 20px;
        font-size: 15px;
    }
    @media screen and (min-width: 1900px) {
        height: 20px;
        font-size: 15px;
    }
`;

const ContenedorEnlace = styled.div`
    grid-row: 3/4;
`;

