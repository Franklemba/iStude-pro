const mongoose = require('mongoose')
const path = require('path')
const UploadPath = 'uploads/Past_papers';

const papersSchema = new mongoose.Schema({
    school: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    yearOfStudy: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    assessmentType: {
        type: String,
        required: true
    },
    papers: [String]

})

papersSchema.virtual('uploadsPath').get(function(){
    return path.join('/',UploadPath)
})

module.exports = mongoose.model('studentPapers',papersSchema)
module.exports.UploadPath = UploadPath