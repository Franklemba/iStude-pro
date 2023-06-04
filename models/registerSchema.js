const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    school:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('adminUsers',UserSchema)
