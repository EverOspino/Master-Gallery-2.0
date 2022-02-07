const express = require('express');
const userControllers = require('../controllers/user_controllers.js');
const imgControllers = require('../controllers/img_controllers.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, res, cb){
        console.log(path.join(__dirname, '../public/image'));
        cb(null, path.join(__dirname, '../public/image'))
    },
    filename: function(req, file, cb){
        const ext = file.originalname.split('.');
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "." + ext[ext.length - 1]);
    }
});

const upload = multer({storage: storage});
const router = express.Router();

module.exports = ()=>{

    router.post('/api/users', userControllers.add); //Sirve para agregar un usuario
    router.get('/api/users', userControllers.list); //Mostrar todos los usuarios
    router.get('/api/users/:id', userControllers.show); //Obtiene el usuario por id que se le mande
    router.delete('/api/users/:id', userControllers.delete); //Elimina el usuario con el id que se le pase
    router.put('/api/users/:id', userControllers.uptdate); //Ruta para actualizar los usuarios

    //--------------------------------------------------------------------------------------
    router.post('/api/register', userControllers.register); //Ruta para registrar al usuario
    router.post('/api/auth', userControllers.auth); //Ruta para iniciar sesión
    //--------------------------------------------------------------------------------------
    
    router.get('/api/img/show', imgControllers.list); //Muestra todas las fotos sin filtros
    router.get('/api/img/show/:id', imgControllers.show); //Busca una imagen por id de la imagen
    router.get('/api/img/user/show/', imgControllers.userShow); //Mostrar todas las fotos del usuario loguemos
    router.post('/api/img/upload', upload.single('myImg'), imgControllers.add); //Actualiza las imagenes
    router.delete('/api/img/delete/:id', imgControllers.delete); //Elimina la imagen del id que se le pase
    return router;
}
