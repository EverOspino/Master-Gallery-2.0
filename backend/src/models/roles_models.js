const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true
    },
    // img: 
});