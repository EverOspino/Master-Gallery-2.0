const express = require('express');
const userControllers = require('../controllers/user_controllers.js');
const imgControllers = require('../controllers/img_controllers.js');

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
    router.post('/api/img/upload', imgControllers.add);
    router.delete('/api/img/delete/:id', imgControllers.delete);
    return router;
}
