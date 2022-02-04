export default function validarTipoImagen( imagenInput ) {
    if (imagenInput.includes('png') 
    || imagenInput.includes('jpg') 
    || imagenInput.includes('jpeg') 
    || imagenInput.includes('gif') ) {
        return true
    }
    else{
        return false;
    }
}