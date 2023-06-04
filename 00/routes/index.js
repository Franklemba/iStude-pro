const express = require('express')
const router = express.Router()
const Comments = require('../models/commentSchema')


////Home page
router.get('/',(req,res)=>{
    res.render('home/index')
})
router.post('/', async (req,res)=>{
    var message = req.body.comment
    var serializedMessage = message.trim();

    const comments = new Comments({
        name: req.body.name,
        program: req.body.program,
        yearOfStudy: req.body.yearOfStudy,
        comment: serializedMessage
    })
    try{
       await comments.save()
       res.render('home/index',{
        message: `message sent successfully`,
        url: "/"
       })
    //    console.log(comments)
    }catch(err){
       res.redirect('/')
       console.log(err)
    }
})

module.exports = router