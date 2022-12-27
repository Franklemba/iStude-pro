const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const StudentPapers = require('../models/StudentUploadSchema') 

const applicationMimeType = [    
    'application/pdf',
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
]

const storage = multer.diskStorage({
    destination: (req, file,cb)=>{
        cb(null,`public/uploads/cbu/${req.body.school.split('(')[1].split(')')[0]}`)
    },
    fileFilter: (req, file, callback)=>{
        callback(null,applicationMimeType.includes(file.mimetype))
    },
    filename: (req, file, cb)=>{
        cb(null,req.body.course+' '+req.body.assessmentType+' '+req.body.year+ path.extname(file.originalname))
    }
})

const upload = multer({storage: storage})

/////admin home page
router.get('/', async (req,res)=>{

    const studentPapers =  await StudentPapers.find({})
    res.render('Ppapers/monitorPage',{
        papers:studentPapers
    })
})

/////upload page
router.get('/uploadPapers',async (req,res)=>{
    const studentPapers = await StudentPapers.find({})
    res.render('Ppapers/studentPapers',{
        StudentPapers: studentPapers,
    })
})


////saving paper to database
router.post('/uploadPapers',upload.single('pastPaper'),async (req,res)=>{

    const paperName  = req.file.filename
    const SchoolNameEdit =req.body.school.split('(')[1].split(')')[0]
    const initialStudentPapers = await StudentPapers.find({
        school:SchoolNameEdit,
        program: req.body.program,
        yearOfStudy: req.body.yearOfStudy,
        course: req.body.course,
        assessmentType: req.body.assessmentType
    })

    let studentPapers;    
   
    if(initialStudentPapers == ''){          ////if particular studentPaper does not exist
      studentPapers = new StudentPapers({
            school:SchoolNameEdit,
            program: req.body.program,
            yearOfStudy: req.body.yearOfStudy,
            course: req.body.course,
            assessmentType: req.body.assessmentType,
            papers: paperName
           });

    }else{                                  //////if particular studentPaper exists
        // console.log(initialStudentPapers[0].papers)
        const id = initialStudentPapers[0]._id
        const papersArray = initialStudentPapers[0].papers
        if(papersArray.includes(paperName) == false){
            papersArray.push(paperName)  // push newly uploaded paper
        }
        studentPapers = await StudentPapers.findById(`${id}`); ///find the particular document
        studentPapers.papers = papersArray   ///update current papers array
    }

    try{
        await studentPapers.save()
        const student_Papers = await StudentPapers.find({})
        res.render('Ppapers/studentPapers',{
            StudentPapers: student_Papers,
            message: `${paperName} uploaded successfully`,
            url: "/admin/uploadPapers"
        })
        console.log(studentPapers)   
    }
    catch(err){
        const student_Papers = await StudentPapers.find({})
        res.render('Ppapers/studentPapers',{
            StudentPapers: student_Papers,
            message: "upload wasn't successful",
            url: "/admin/uploadPapers"
        })
        console.log(err)
    }

})

///delete page
router.post('/', async (req,res)=>{

    const singlePaper = req.body.singlePaper
    const id = req.body.id
    const school = req.body.school
    

    const studentPapers = await StudentPapers.findById(`${id}`);
    const papersArray = studentPapers.papers
    const papersArrayEdit = papersArray.remove(singlePaper)
    studentPapers.papers = papersArrayEdit

    try{
            await studentPapers.save()

            fs.unlink(`public/uploads/cbu/${school}/${singlePaper}`, err=>{
                if(err)
                    console.log(`an error has occurred => ${err}`)
                else
                   console.log('file was deleted successfully')
            })
            console.log('paper was deleted successfully')
            res.redirect('/admin')
      
    }
    catch(err){
        
        const studentPapers =  await StudentPapers.find({})
        res.render('Ppapers/monitorPage',{
            papers: studentPapers,
            message: "error deleting paper",
            url: "/admin"
        })
        console.log(err)
    }

})



module.exports = router
