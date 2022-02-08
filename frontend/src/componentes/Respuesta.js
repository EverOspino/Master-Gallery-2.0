import React from 'react';
import '../Componentes-css/Respuesta.css';

export default function Sesion() {

    const cerrar = () => {
        window.location.href = './';
    }

    return(
        <div className='container'>
            <div className='box'>
                <img src='./imagenes/arrow_back_black_24dp.svg' onClick={ cerrar }></img>
                <p>GRACIAS POR CONTACTARNOS</p>
            </div>
        </div>
    )
}