const Img = require('../models/img_models.js');
const multer = require('multer');
const dotenv = require('dotenv').config();

const cloudinary = require('../config/cloudinary.config.js');


exports.add = async (req, res)=>{  
    try {
        const file = req.file;
        const result = await cloudinary.v2.uploader.upload(req.file.path);

        const photoProps = {
            filename: result.public_id,
            userid: req.body.userId,
            size: result.bytes,
            mimeType: file.mimetype,
            imageURL: result.secure_url,
            createdAt: new Date(),
        }
        const img = new Img(photoProps);
        img.save();
        res.json({ok: true, message: 'Imagen subida', img: img});    
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'La imagen no se pudo subir', error: error});
    }
}
exports.addMultiple = async(req, res)=>{
    const files = req.files;
    const newFiles = [];
    console.log(files);
    try {
        for (let index = 0; index < files.length; index++) {
            const file = req.files[index];
            const result = await cloudinary.v2.uploader.upload(file.path);
            
            const photoProps = {
                filename: result.public_id,
                userid: req.body.userId,
                size: result.bytes,
                mimeType: file.mimetype,
                imageURL: result.secure_url,
                createdAt: new Date(),
            }
            const img = new Img(photoProps);
            img.save();
            newFiles.push({img});
        }
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'La imagen no se pudo subir', error: error});
    }
    res.json({ok: true, message: 'Imagen subida', img: newFiles});   
}

exports.list = async (req, res)=>{
    try {
        const imgs = await Img.find({});
        res.json(imgs);
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'No se encontraron elementos'});
    }
}

exports.delete = async(req, res)=>{
    try {
        const photo = await Img.findByIdAndRemove({"_id": req.params.id});
        const result = await cloudinary.v2.uploader.destroy(photo.filename);
        
        res.json({ok: true, message: 'Imagen elimanda con ??xito'});
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'Error al eliminar la imagen'});
    }
}

exports.show = async(req, res)=>{
    try {
        const img = await Img.findById(req.params.id);
        if(!img) return res.json({ok: true, message: 'La imagen no fue encontrada.'});

        res.json(img)
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'La imagen no fue encontrada'})
        next();
    }
}

exports.userShow = async (req, res)=>{
    try {
        const img = await Img.find({userid: req.body.userId})
        
        res.json({ok: true, img: img});
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'No se pudo encontar la imagen'});
    }
}