const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        required:true
    },
    role:{
        type:String,
        default:'seller'
    }
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User',UserSchema);


module.exports=User;