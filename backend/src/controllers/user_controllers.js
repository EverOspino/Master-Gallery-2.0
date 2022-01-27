const User = require('../models/user_models.js');

exports.add = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();

        res.json({ message: 'Cliente agregado con éxito' });
        // res.json(user);

    } catch (error) {
        if(error.code === 11000){
            res.send({message: 'El correo ya existe en la base de datos'})
        }
        console.log(error);
        res.send(error);
        next();
    }
    
}
exports.list = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
        
    }
}
exports.uptdate = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            { "_id": req.params.id },
            req.body,
            { new: true }
            );
            res.json({message: 'Usuario actualizado'});
        } catch (error) {
            if(error.code === 11000){
                res.send({message: 'El correo ya existe en la base de datos'})
            }
        console.log(error);
        res.send(error);
        next();

    }
}
exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) res.json({message: 'El cliente no fue encontrado'});

        res.json(user);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }

}
exports.delete = async (req, res) => {
    try {
        await User.findByIdAndRemove({"_id": req.params.id});

        res.json({message: 'Cliente eliminado correctamente'})
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }

}