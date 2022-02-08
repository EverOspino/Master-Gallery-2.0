import validarEmail from './validarEmail';

export default function validarFormulario(tipo, email, contraseña, nombre, contraseña2) {
    let res = { ok: true };

    if(!(email && contraseña)) res = {ok:false, mensaje:'Hay campos vacíos'} ;
    if(!validarEmail(email)) res = {ok:false, mensaje:'El correo no es valido'} ;

    if (tipo === 'registro') {
        if(!(nombre && contraseña2)) res = {ok:false, mensaje:'Hay campos vacíos'} ;
        if( contraseña !== contraseña2 ) res = {ok:false, mensaje:'Las contraseñas no coinciden'}  ;
    }
    
    return res;
  }