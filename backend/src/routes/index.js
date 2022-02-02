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

    router.post('/api/users', userControllers.add);
    router.get('/api/users', userControllers.list);
    router.get('/api/users/:id', userControllers.show);
    router.delete('/api/users/:id', userControllers.delete);
    router.put('/api/users/:id', userControllers.uptdate);

    //--------------------------------------------------------
    router.get('/api/register', userControllers.register);
    router.get('/api/auth', userControllers.auth);
    //---------------------------------------------------------
    
    router.get('/api/img/show', imgControllers.list);
    router.get('/api/img/show/:id', imgControllers.show);
    router.get('/api/img/user/show/', imgControllers.userShow);
    router.post('/api/img/upload', upload.single('myImg'),imgControllers.add);
    router.delete('/api/img/delete/:id', imgControllers.delete);
    return router;
}
