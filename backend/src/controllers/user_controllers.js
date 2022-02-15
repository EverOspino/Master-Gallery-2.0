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

exports.auth = async(req, res, next)=>{
    try {
        const {email, password} = req.body;
        if(!password || !email) return res.json({ok: false, message: 'Hay campos vacíos'});
        else{
            const newUser = new User();
            const userExists = await newUser.emailExists(email);

            if(userExists){
                const userFound = await User.findOne({email: email});
                
                // console.log(userFound);
                // console.log(userFound.password);

                const passCorrect = await newUser.isCorrectPassword(password, userFound.password);
                if(passCorrect){
                    req.session.user = userFound;
                    // console.log(req.session);
                    return res.json({ok: true, message: 'Usuario logueado', user:userFound });
                }
            }
            
            res.json({ok: false, message: 'Email o contraseña incorrecta'});
            
        }    
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: 'error'})
    }


}

exports.register = async(req, res, next)=>{
    try {
        const user = req.body;
        if(!user.name || !user.password || !user.email) return res.json({ok: false, message: 'Hay campos vacíos.'});
        else {
            newUser = new User(user);
            const exists = await newUser.emailExists(newUser.email);
            if(exists) return res.json({ok: false, message: "El usuario ya existe"});
    
            await newUser.save();
            res.json({ok: true, message: 'El usuario fue registrado', user: newUser});
        }
    } catch (error) {
        console.log(error);
        res.json({ok: false, message: error})
    }
}