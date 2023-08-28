const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },

    userName:{
        type:String,
        required:true
    },
    
    postContent:{
        type:String,
        required:true
    }
})

const post = mongoose.model('posts',postSchema);
module.exports = post



