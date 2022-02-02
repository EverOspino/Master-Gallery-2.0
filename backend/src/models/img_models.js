const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imgSchema = new Schema({
    filename: {type: String},
    userid: {type: String, required: true},
    size: {type: Number, required: true},
    mimeType: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model("Img", imgSchema);