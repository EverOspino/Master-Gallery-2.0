import React, { useState } from 'react';

//Styled Components
import styled, { GlobalStyleComponent } from 'styled-components';
import { Background } from './Background';
import { Input } from './Input';
import { ButonOutline } from './ButonOutline';
import { Enlace } from './Enlace';
import { ContentBox } from './ContentBox';

//Firebase
import firebaseApp from '../config/Firebase_config';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

//Documentos
import validarEmail from './validarEmail';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function Registro()  {
    const [registerNombre, setRegisterNombre] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerContraseña, setRegisterContraseña] = useState("");
    const [registerContraseña2, setRegisterContraseña2] = useState("");

    const registrarUsuario = async (e) => {
        e.preventDefault();

        let camposllenos = (registerNombre && registerEmail && registerContraseña && registerContraseña2) ? true : alert('Campo(s) Vacio(s)');
        if (camposllenos) {
            if (validarEmail( registerEmail )) {
                let isEqual = (registerContraseña === registerContraseña2) ? true : alert('Las contraseñas no coinciden');
                if (isEqual) {
                    try{
                        const infoUsuario = await createUserWithEmailAndPassword(auth, registerEmail, registerContraseña);
                        await updateProfile(infoUsuario.user, { displayName: registerNombre });
                        
                        const user = auth.currentUser;
                        const envioCorreo = await sendEmailVerification(user);
                        window.location.href = './respuesta';
                    }catch (error){
                        alert(error.code);
                        console.log(error.message);
                    }
                }
            } else{
                alert('Correo no valido');
            }
        }
    };
    

    return(
        <Background>
            <Content GTRow = '1fr 3.5fr .5fr'>
                <Logo>
                    <Tittle>CREA TU CUENTA</Tittle>
                </Logo>
                <form>
                    <Input type='text' 
                    onChange={(event) => {setRegisterNombre(event.target.value)}} placeholder='Nombre de Usuario' />
                    
                    <Input type='email'
                    onChange={(event) => {setRegisterEmail(event.target.value.toLocaleLowerCase())}} placeholder='Correo' required />
                    
                    <Input type='password'
                    onChange={(event) => {setRegisterContraseña(event.target.value)}} placeholder='Contraseña' required />
                    
                    <Input type='password'
                    onChange={(event) => {setRegisterContraseña2(event.target.value)}} placeholder='Confirmar Contraseña' required />
                    
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
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        width: 60vw;
        height: 60vw;
    }
    @media screen and ( min-width: 1200px) {
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
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        font-size: 28px;
    }
    @media screen and ( min-width: 1200px) {
        font-size: 20px;
    }
    @media screen and (min-width: 1900px) {
        font-size: 28px;
    }
`;

const ContenedorEnlace = styled.div`
    grid-row: 3/4;
`;

