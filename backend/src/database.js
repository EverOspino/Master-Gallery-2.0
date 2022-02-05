const mongoose = require('mongoose');

( async () => {
    // mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.DB_CONNECTION, {
        dbName: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
    })
    console.log('Conectado a MongoDB');
})();