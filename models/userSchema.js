const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
       type: String,
       required: true
    },
    password: {
       type: String,
       required: true
    },
    email: {
        type: String,
        required: true
    },
    accountType: {
        type: String,
        required: true,
        default: 'freeTier'
    },
    school: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users',UserSchema)
