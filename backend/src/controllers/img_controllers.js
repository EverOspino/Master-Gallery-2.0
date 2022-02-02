const Img = require('../models/img_models.js');
const multer = require('multer');

exports.add = async (req, res)=>{  
    // const img = new Img(req.body);
    // try {
    //     await img.save();
    //     res.json({ok: true, message: 'Imagen agregada'});
    // } catch (error) {
    //     console.log(error);
    //     res.send({ok: false, message: error});
    // }
    res.json({ok: true, message: 'Foto subida'});
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

}