const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    program:{
        type: String,
        required: true
    },
    yearOfStudy:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('comments',commentSchema)