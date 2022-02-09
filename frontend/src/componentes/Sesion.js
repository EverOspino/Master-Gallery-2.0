import React, { useState } from 'react';

//Styled Components
import styled, { GlobalStyleComponent } from 'styled-components';
import { Background } from './Background';
import { Input } from './Input';
import { ButonOutline } from './ButonOutline';
import { Enlace } from './Enlace';
import { ContentBox } from './ContentBox';

//Documentos
import Usuario from './Usuario';
import validarFormulario from './validaciones/validadFormulario';

export default function Sesion() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerContraseña, setRegisterContraseña] = useState("");
    const [userLogin, setUserLogin] = useState('');

    //funcion que inicia la sesion de un usuario
    const iniciarSesion = async (e) => {
        e.preventDefault();
        
        const validacion = validarFormulario('sesion', registerEmail, registerContraseña) ;
        if (validacion.ok) {
            const usuario = {
                email: registerEmail,
                password: registerContraseña,
            }
            const res = await fetch( 'http://localhost:3001/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(usuario)} );
            const data = await res.json();
            if(data.ok){
                sessionStorage.setItem('usuario', registerEmail);
                sessionStorage.setItem('nombre', data.user.name);
                sessionStorage.setItem('id', data.user._id);
                setUserLogin(data.user);

                document.getElementById('email').value = '';
                document.getElementById('password').value = '';

            } else{
                console.log(data.message);
            }
        } else {
            alert(validacion.mensaje);
        }
    }

    return(
        <>
            <Background>
                <ContainerBox>
                    <Imagen />
                    <ContentBox2>
                        <Logo>
                            <ImgLogo src='./imagenes/logo-MG.svg'></ImgLogo>
                        </Logo>
                        <form>
                            <Input id='email' type='email'
                            onChange={(event) => {setRegisterEmail(event.target.value.toLocaleLowerCase())}} 
                            placeholder='Correo' required />
                            
                            <Input id='password' type='password'
                            onChange={(event) => {setRegisterContraseña(event.target.value)}} 
                            placeholder='Contraseña' required />
                            
                            <ButonOutline type='submit' onClick={iniciarSesion} >INGRESAR</ButonOutline>
                        </form>
                        <ContenedorEnlace>
                            <Enlace href='/registro'>Crea una cuenta</Enlace>
                        </ContenedorEnlace>
                    </ContentBox2>
                </ContainerBox>
            </Background>
            {(userLogin || sessionStorage.getItem('usuario')) && <Usuario setUser = {setUserLogin} />}
        </>
    )
}

const ContainerBox = styled.div`
    background-color: white;
    box-shadow: 4px 6px 5px #555555;
    display: grid;
    grid-template-columns: 1fr 1.5fr;

    @media screen and ( max-width: 575px) {
        width: 95%;
        height: 55%;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        width: 80vw;
        height: 51vw;
    }
    @media screen and ( min-width: 1200px) {
        width: 500px;
        height: 300px;
    }
    @media screen and (min-width: 1900px) {
        width: 60vh;
        height: 40vh;
    }

`;

const ContentBox2 = styled(ContentBox)`
    width: 100%;
`;

const Imagen = styled.div`
    width: 100%;
    height: 100%;
    background-image: url('./img-sesion.jpg');
    background-repeat: round;
    box-sizing: border-box;

    @media screen and ( max-width: 575px) {
        display: none;
    }
`;

const Logo = styled.div`
    grid-row: 1/2;
    align-self: flex-end;
`;

const ImgLogo = styled.img`
    padding: 0px;
    bottom: 13px;

    @media screen and ( max-width: 575px) {
        width: 170px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        width: 135px;
    }
    @media screen and ( min-width: 1200px) {
        width: 115px;
    }
    @media screen and (min-width: 1900px) {
        width: 150px;
    }
`;

const ContenedorEnlace = styled.div`
    grid-row: 3/4;
`;