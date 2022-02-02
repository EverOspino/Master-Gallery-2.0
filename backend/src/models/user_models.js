const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); 

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, trim: true},
    email: { type: String, trim: true, unique: true, lowercase: true},
    password: { type: String }
})

userSchema.pre('save', function(next){
    if(this.isModified('password') || this.isNew){
        const document = this;

        bcrypt.hash(document.password, 10, (error, hash)=>{
            if(error) return next(error);

            document.password = hash;
            next();
        })
    }else{
        next();
    }
});

userSchema.methods.emailExists = async function(email){
    let result = await mongoose.model('User').find({email: email});
    return result.length > 0;
}

userSchema.methods.isCorrectPassword = async function(password, hash){
    console.log(password, hash);
    const same = await bcrypt.compare(password, hash);

    return same;
}

module.exports = mongoose.model('User', userSchema);