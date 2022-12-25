const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const StudentPapers = require('../models/StudentUploadSchema')  ///

const UploadPath = path.join('public',StudentPapers.UploadPath)
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

// const upload_item = upload.single('pastPaper')

////Home page
router.get('/',(req,res)=>{
    res.render('home/index')
})

//////school page
router.get('/schools',(req,res)=>{
    res.render('schools/school')
})

/////upload page
router.get('/UploadPapers',async (req,res)=>{
    const studentPapers = await StudentPapers.find({})
    res.render('Ppapers/studentPapers',{
        StudentPapers: studentPapers,
        mode: 'initial'
    })
})
////saving paper to database
router.post('/UploadPapers',upload.single('pastPaper'),async (req,res)=>{

    const paperName  = req.file.filename
    const SchoolNameEdit =req.body.school.split('(')[1].split(')')[0]
    const initialStudentPapers = await StudentPapers.find({
        school:SchoolNameEdit,
        program: req.body.program,
        yearOfStudy: req.body.yearOfStudy,
        course: req.body.course,
        assessmentType: req.body.assessmentType
    })
    // console.log(initialStudentPapers)
    if(initialStudentPapers == ''){
     const studentPapers = new StudentPapers({
            school:SchoolNameEdit,
            program: req.body.program,
            yearOfStudy: req.body.yearOfStudy,
            course: req.body.course,
            assessmentType: req.body.assessmentType,
            papers: paperName
           });

           try{
            await studentPapers.save();
            const student_Papers = await StudentPapers.find({})

            res.render('Ppapers/studentPapers',{
                StudentPapers: student_Papers,
                mode: 'final'
            })
                      
            console.log('paper saved successfully')
           }
           catch(err){
            res.send('error saving paper')
            console.error(err)
           }
    }else{
        // console.log(initialStudentPapers[0].papers)
        const id = initialStudentPapers[0]._id
        const papersArray = initialStudentPapers[0].papers
        papersArray.push(paperName)  // push newly uploaded paper
        const studentPapers = await StudentPapers.findById(`${id}`); ///find the particular document
        studentPapers.papers = papersArray   ///update current papers array
        try{
            await studentPapers.save()
            const student_Papers = await StudentPapers.find({})
            res.render('Ppapers/studentPapers',{
                StudentPapers: student_Papers,
                mode: 'final'
            })
            console.log(studentPapers)   
        }
        catch(err){
            res.send('error updating paper')
            console.log(err)
        }
    }

})

////download
router.get('/:course',async (req,res)=>{
    const Course = req.params.course
    const CourseEdit = Course.toUpperCase()
    const searchQuery = req.query.course;

    if(searchQuery){
        const searchQueryEdit = searchQuery.toUpperCase().split(' ')[0]
        const numberOfCourses = await StudentPapers.find({
            course: searchQueryEdit
        }).countDocuments() 

        const studentPapers = await StudentPapers.find({
            course:searchQueryEdit
        })
        res.render('schools/downloadPage',{
            content:studentPapers
        })
        console.log(numberOfCourses)
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

////admin page
router.get('/admin/all', async (req,res)=>{

    const studentPapers =  await StudentPapers.find({})
    res.render('Ppapers/monitorPage',{
        papers:studentPapers
    })
})
///delete page
router.post('/admin/delete', async (req,res)=>{

    const singlePaper = req.body.singlePaper
    const id = req.body.id
    const school = req.body.school
    

    // console.log(`public/uploads/cbu/${school}/${singlePaper}`)
    // res.send(`public/uploads/cbu/${school}/${singlePaper}`)

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
            res.redirect('/admin/all')
      
    }
    catch(err){
        res.send('error deleting paper')
        console.log(err)
    }

    // console.log(papersArrayEdit)

    // res.send(papersArrayEdit)
})



module.exports = router