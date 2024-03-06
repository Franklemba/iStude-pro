const express = require('express')
const router = express.Router()
const StudentPapers = require('../models/StudentUploadSchema')

//////school page
router.get('/', async (req,res)=>{

    const availaiblePastPapers = await StudentPapers.find({
        school: "SICT",
        program: "Computer Science"
    });

    console.log(availaiblePastPapers);

    res.render('schools/school',{
        availaiblePastPapers
    })
})

////download page
router.get('/:course',async (req,res)=>{
    const Course = req.params.course
    const CourseEdit = Course.toUpperCase()
    const searchQuery = req.query.course;

    if(searchQuery){
        const searchQueryEdit = searchQuery.trim().toUpperCase().split(' ')[0]
        const studentPapers = await StudentPapers.find({
            course:searchQueryEdit
        })
        res.render('schools/downloadPage',{
            content:studentPapers
        })
    }else{        
        const studentPapers =  await StudentPapers.find({
            course:CourseEdit
        })
        // res.send(studentPapers)
        res.render('schools/downloadPage',{
            content:studentPapers
        })
    }
    
})


router.get('/:course/:assessment',async (req,res)=>{
    const Course = req.params.course;
    const CourseEdit = Course.toUpperCase();
    const assessment = req.params.assessment;
    const searchQuery = req.query.course;

    if(searchQuery){
        const searchQueryEdit = searchQuery.trim().toUpperCase().split(' ')[0]
        const studentPapers = await StudentPapers.find({
            course:searchQueryEdit
        })
        res.render('schools/downloadPage',{
            content:studentPapers
        })
    }else{        
        const studentPapers =  await StudentPapers.find({
            course:CourseEdit
        })
        // res.send(studentPapers)
        res.render('schools/downloadPage',{
            content:studentPapers
        })
    }
    
})

module.exports = router
