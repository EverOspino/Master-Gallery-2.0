import React from 'react';
import { getAuth, signOut } from 'firebase/auth'
import firebaseApp from '../config/Firebase_config';
import '../Componentes-css/Respuesta.css';

const auth = getAuth(firebaseApp);

export default function Sesion() {

    const cerrarSesion = () => {
        signOut(auth);
        window.location.href = './';
    }

    return(
        <div className='container'>
            <div className='box'>
                <img src='./imagenes/arrow_back_black_24dp.svg' onClick={ cerrarSesion }></img>
                <p>GRACIAS POR CONTACTARNOS</p>
            </div>
        </div>
    )
}