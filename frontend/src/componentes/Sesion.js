import React, { useState } from 'react';

//Styled Components
import styled, { GlobalStyleComponent } from 'styled-components';
import { Background } from './Background';
import { Input } from './Input';
import { ButonOutline } from './ButonOutline';
import { Enlace } from './Enlace';
import { ContentBox } from './ContentBox';

//firebase
import firebaseApp from '../config/Firebase_config';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

//Documentos
import Usuario from './Usuario';
import '../Componentes-css/background.css';
import '../Componentes-css/Sesion.css';

const auth = getAuth(firebaseApp);

export default function Sesion() {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerContraseña, setRegisterContraseña] = useState("");

    const iniciarSesion = async (e) => {
        e.preventDefault();
        
        let camposLlenos = (registerEmail && registerContraseña) ? true : alert('Campo(s) Vacio(s)');
        if (camposLlenos) {
            try{
                const infoUsuario = await signInWithEmailAndPassword(auth, registerEmail, registerContraseña);

            }catch (error){
                alert(error.code);
                console.log(error);
            } 
        }
    }

    return(
        <>
            <Background>
                <ContainerBox>
                    <Imagen />
                    <ContentBox>
                        <Logo>
                            <ImgLogo src='./imagenes/logo-MG.svg'></ImgLogo>
                        </Logo>
                        <form>
                            <Input type='email'
                            onChange={(event) => {setRegisterEmail(event.target.value.toLocaleLowerCase())}} 
                            placeholder='Correo' required />
                            
                            <Input type='password'
                            onChange={(event) => {setRegisterContraseña(event.target.value)}} 
                            placeholder='Contraseña' required />
                            
                            <ButonOutline type='submit' onClick={iniciarSesion} >INGRESAR</ButonOutline>
                        </form>
                        <ContenedorEnlace>
                            <Enlace href='/registro'>Crea una cuenta</Enlace>
                        </ContenedorEnlace>
                    </ContentBox>
                </ContainerBox>
            </Background>
            {auth.currentUser && <Usuario user={ auth.currentUser } />}
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