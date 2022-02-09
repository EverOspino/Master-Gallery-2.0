import React, { useState, useEffect } from 'react';

//Styled Components
import styled, { GlobalStyleComponent } from 'styled-components';
import { Buton } from './ButonX';

//Bootstrap Components
import { Alert, Button } from 'react-bootstrap';
import AlertaEliminar from './AlertaEliminar.js'

//Documentos
import validarTipoImagen from './validaciones/comprobarImagen.js';


export default function Usuario( props ) {

    const [archivo, setArchivo] = useState("");
    const [barraCarga, setBarraCarga] = useState(0);
    const [imgList, setImgList] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [deleteImg, setDeleteImg] = useState(false);
    const [nameImg, setNameImg] = useState('');

    useEffect( async () =>{
        const res = await fetch( 'http://localhost:3001/api/img/user/show/'
        , { method: 'POST',
             headers: { 'Content-Type': 'application/json' }, 
             body: JSON.stringify({userId: sessionStorage.getItem('id')})} );
        const data = await res.json();

        if (data.ok) {
            console.log(data.img);
        } else {
            console.log(data.message);
        }
        

        /*const q = query(collection(firestore, `imagenes-${props.user.email}`));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => { setImgList( oldArray => [...oldArray, doc.data()] ) });*/
    }, [] );

    /*useEffect(() => {
        if (deleteImg) {
            eliminarImagen(nameImg);
        }
      }, [deleteImg]);*/

    const subirImagen = async () => {
        if( archivo ) {
            if(validarTipoImagen(archivo.type)) {
                console.log(archivo);
                const formData = new FormData();
                formData.append("myImg", archivo);
                formData.append("userId", sessionStorage.getItem('id'));
                const res = await fetch( 'http://localhost:3001/api/img/upload', { method: 'POST',  body: formData} );
                const data = await res.json();

                if(data.ok){
                    console.log(data);
    
                } else{
                    console.log(data);
                }

                /*setBarraCarga(10);
    
                const storageRef = ref(storage, `/imagenes/imagenes-${props.user.email}/${archivo.name}`);
                await uploadBytes(storageRef, archivo);
                setBarraCarga(30);
    
                const enlaceUrl = await getDownloadURL(storageRef);
                setBarraCarga(60);
    
                const docuRef = doc(firestore, `/imagenes-${props.user.email}/${archivo.name}`);
                await setDoc(docuRef, { nombre: archivo.name, url: enlaceUrl });
                setBarraCarga(100);

                */
                window.location.href = './';
            }else{
                alert('Por favor, Inserte una imagen');
            }
        }else{
            alert('Por favor, Inserte una imagen');
        }
    }


    const eliminarImagen = async ( nombre ) => {
        /*setBarraCarga(10);
        //eliminando imagen del storage
        const deleteRef = ref(storage, `/imagenes/imagenes-${props.user.email}/${nombre}`);
        await deleteObject(deleteRef);

        setBarraCarga(50);
        //eliminando el documento de la imagen del firestore
        await deleteDoc(doc(firestore, `imagenes-${props.user.email}`, `${nombre}`));

        setBarraCarga(100);
        window.location.href = './';*/
    }

    const cerrarSesion = () => {
        props.setUser('');
        sessionStorage.clear();
        window.location.href = './';
    }
    
    /* { imgList.map( (data, idx) => {return ( 
        <DivImagen> 
            <Imagen key={idx} src={data.url} ></Imagen> 
            <BotonEliminar onClick={ () => {setNameImg(data.nombre);  setShowAlert(true);} } > <img src='./imagenes/icono-cerrar.svg'></img> </BotonEliminar> 
        </DivImagen> )} ) } */

    return (
        <>
            <Overlay>
                <ContenedorModal>
                    <Encabezado>
                        <h4>Bienvenido {sessionStorage.getItem('nombre')}, esta es su colección de imagenes</h4>
                    </Encabezado>
                    <BotonCerrar onClick={cerrarSesion}> <img src='./imagenes/icono-cerrar.svg'></img> </BotonCerrar>
                    <ContenedorImagenes>
                        
                    </ContenedorImagenes>
                    <ContenedorInput>
                        <input type='file' name='myImg' onChange={(event) => {setArchivo(event.target.files[0])}}></input>
                        <progress value={barraCarga} max={100}></progress>
                        <BotonSubir onClick={subirImagen}> <img src='./imagenes/upload.svg'></img> </BotonSubir>
                    </ContenedorInput>
                </ContenedorModal>
                {showAlert &&  <AlertaEliminar showAlert={ showAlert } setShowAlert={ setShowAlert } setDeleteImg={setDeleteImg} />} 
            </Overlay>

        </>
    );
}


const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .2);
    position: fixed;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
`;

const ContenedorModal = styled.div`
    background: ${({theme}) => theme.bgc };
    position: relative;
    box-shadow: 2px 4px 5px #555555;

    @media screen and ( max-width: 575px) {
        width: 100%;
        height: 80%;
        padding: 10px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        width: 90%;
        height: 70%;
        padding: 20px;
        font-size: 1.375rem;
    }
    @media screen and ( min-width: 1200px) {
        width: 40%;
        height: 70%;
        padding: 15px;
        font-size: 1.105rem;
    }
    @media screen and (min-width: 1900px) {
        width: 50%;
        height: 80%;
        padding: 20px;
        font-size: 1.585rem;
    }
`;

const Encabezado = styled.div`
    height: 10%;
    width: 80%;
    display: flex;
    align-items: center;
    margin: 0px 0px 5px 10px;
    padding-bottom: 5px;

    h4{
        color: ${({theme}) => theme.text };
        @media screen and ( max-width: 575px) {
            font-size: 20px;
        }
        @media screen and ( min-width: 576px) and ( max-width: 1199px) {
            font-size: 23px;
        }
        @media screen and ( min-width: 1200px) {
            font-size: 17px;
        }
        @media screen and (min-width: 1900px) {
            font-size: 24px;
        }
    }
`;

const BotonCerrar = styled(Buton)`
    position: absolute;
    top: 15px;
    right: 15px;

    @media screen and ( max-width: 575px) {
        height: 35px;
        width: 35px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        height: 45px;
        width: 45px;
    }
    @media screen and ( min-width: 1200px) {
        height: 32px;
        width: 32px;
    }
    @media screen and (min-width: 1900px) {
        height: 40px;
        width: 40px;
    }
`;

const ContenedorImagenes = styled.div`
    width: 100%;
    height: 80%;
    background-color: ${({theme}) => theme.bgcImg };
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    column-gap: 10px;
    row-gap: 10px;
    overflow-y: scroll;
`;

const DivImagen = styled.div`
    position: relative;
    max-width: 33%;
    height: 25%;
    flex-grow: 1;
`;

const Imagen = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    &:hover{
        box-sizing: border-box;
        border: 3px solid #B81BD6; 
    }

`;


const BotonEliminar = styled(Buton)`
    position: absolute;
    top: 3px;
    right: 3px;
    background: rgba(255, 255, 255, .5);

    @media screen and ( max-width: 575px) {
        height: 25px;
        width: 25px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        height: 30px;
        width: 30px;
    }
    @media screen and ( min-width: 1200px) {
        height: 25px;
        width: 25px;
    }
    @media screen and (min-width: 1900px) {
        height: 35px;
        width: 35px;
    }
`;


const ContenedorInput = styled.div`
    display: flex;
    height: 10%;
    align-items: center;
    justify-content: space-between;

    progress{
        width: 40%;
    }

    input{
        width: 40%;
        color: ${({theme}) => theme.text };
        @media screen and ( max-width: 575px) {
            font-size: 1rem;
        }
        @media screen and ( min-width: 576px) and ( max-width: 1199px) {
            font-size: 1.3rem;
        }
        @media screen and ( min-width: 1200px) {
            font-size: .9rem;
        }
        @media screen and (min-width: 1900px) {
            font-size: 1.4rem;
        }
    }
`;

const BotonSubir = styled(Buton)`

    @media screen and ( max-width: 575px) {
        height: 38px;
        width: 38px;
    }
    @media screen and ( min-width: 576px) and ( max-width: 1199px) {
        height: 46px;
        width: 46px;
    }
    @media screen and ( min-width: 1200px) {
        height: 38px;
        width: 38px;
    }
    @media screen and (min-width: 1900px) {
        height: 47px;
        width: 47px;
    }
`;
