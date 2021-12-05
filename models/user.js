const mongoose = require('mongoose');

//store all properties for database
const UserSchema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true
    },
    email: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0    //to signify admin or user
    },
 },
 { timestamps: true}  


);  

const User = mongoose.model('User', UserSchema );

module.exports = User;      //check the role and export that user