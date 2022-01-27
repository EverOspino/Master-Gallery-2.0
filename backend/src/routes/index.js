const express = require('express');
const userControllers = require('../controllers/user_controllers.js');

const router = express.Router();

module.exports = ()=>{

    router.post('/api/users', userControllers.add);
    router.get('/api/users', userControllers.list);
    router.get('/api/users/:id', userControllers.show);
    router.delete('/api/users/:id', userControllers.delete);
    router.put('/api/users/:id', userControllers.uptdate);

    return router;
}
