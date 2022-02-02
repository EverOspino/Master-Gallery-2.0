const Img = require('../models/img_models.js');
const multer = require('multer');

exports.add = async (req, res)=>{  
    try {
        const file = req.file;
        // console.log(file);
        const photoProps = {
            filename: file.filename,
            userid: req.session.user._id,
            size: file.size,
            mimeType: file.mimetype,
            createdAt: new Date()
        }
        const img = new Img(photoProps);
        img.save();
        res.json({ok: true, message: 'Foto subida'});    
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'La foto no se pudo subir'});
    }
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
        await Img.findByIdAndRemove({"_id": req.params.id})

        res.json({ok: true, message: 'Imagen elimanda con éxito'});
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'Error al eliminar la imagen'});
    }
}

exports.show = async(req, res)=>{
    try {
        const img = await Img.findById(req.params.id);
        if(!img) return res.json({ok: true, message: 'La foto no fue encontrada.'});

        res.json(img)
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'La foto no fue encontrada'})
        next();
    }
}

exports.userShow = async (req, res)=>{
    try {
        const img = await Img.find({userid: req.session.user._id})

        res.json(img);
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'No se pudo encontar la imagen'});
    }
}