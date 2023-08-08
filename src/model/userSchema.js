const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail:{
        type:String,
        required:true,
    },
    userFirstName:{
        type:String,
        required:true
    },
    userLastName:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true,
        minLength:6,
        maxLenth:12
    }
})

const user = mongoose.model('userdatas',userSchema);
module.exports = user