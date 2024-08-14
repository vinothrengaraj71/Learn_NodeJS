const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    name :{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image : {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required: true
    },
    is_online: {
        type: String,
        default: '0'
    }},
    {timestamps:true}
);

const UserModel = mongoose.model('User',userScheme);

module.exports = UserModel;