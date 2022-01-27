const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String
    }
    // img: [{

    // }]
})

module.exports = mongoose.model('User', userSchema);