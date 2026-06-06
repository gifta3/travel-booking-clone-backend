const mongoose=require('mongoose');

const UserSchema= new mongoose.Schema({
Name:{
    type:String,
    required:true
},
Username:{
    type:String,
    required:true
},
Password:{
    type:String,
    required:true
},
Email:{
    type:String,
    required:true
},
},{timeStamps:true});
const UserModel=mongoose.model('User',UserSchema);

module.exports = UserModel;