const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerS3 = require('multer-s3')
const fs = require('fs')
const path = require('path')
const StudentPapers = require('../models/StudentUploadSchema') 
const Comments = require('../models/commentSchema')
const AdminUsers = require('../models/registerSchema')
const aws = require("aws-sdk");
const applicationMimeType = [    
    'application/pdf',
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"
]


aws.config.update({
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    region:process.env.AWS_REGION
 })
 
 const s3 = new aws.S3();
const storage = multer.memoryStorage({
    fileFilter: (req, file, callback)=>{
        callback(null,applicationMimeType.includes(file.mimetype))
    }
})

const upload = multer({storage: storage})
const s3Uploadv2 = async(file,school,paperName) =>{

    const param = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${school}/${paperName}`,     
        Body: file.buffer
    };

    return await s3.upload(param).promise();
}


/////admin home page
router.get('/', async (req,res)=>{

    const studentPapers =  await StudentPapers.find().sort({createdAt:-1})
    if(req.user.username === 'istude'){
        res.render('admin/monitorPage',{
            papers:studentPapers,
            name: req.user.username
        })
    }else{
        res.render('admin/studentPapers',{
            StudentPapers: studentPapers,
            name: req.user.username
        })
    }
    
})
/////comment page
router.get('/comments', async (req,res)=>{
    const comments = await Comments.find()
    const commentsTotal = await Comments.find().countDocuments()
    if(req.user.username === 'istude'){
        res.render('admin/comments', {
            comments:comments,
            name: req.user.username,
            number: commentsTotal
        })
    }else{
        res.redirect('/admin')
    }
    
})

router.post('/comments', async (req,res)=>{
    const id = req.body.id
   
    try{
        await Comments.findByIdAndDelete(`${id}`)
        res.redirect('/admin/comments')
    }catch(err){
        res.redirect('/admin')
        console.log(err)
    }
})

/////users page
router.get('/users', async (req,res)=>{
    const Users = await AdminUsers.find()
    const usersTotal = await AdminUsers.find().countDocuments()
    if(req.user.username === 'istude'){
        res.render('admin/users',{
            users: Users,
            number: usersTotal,
            name: req.user.username
        })
    }else{
        res.redirect('/admin')
    }
    
})
///deleting user
router.post('/users', async (req,res)=>{
   const id = req.body.id
   try{
     await AdminUsers.findByIdAndDelete(`${id}`)
     res.redirect('/admin/users')
   }catch(err){
      res.redirect('/admin')
      console.log(err)
   }
})
/////upload page
router.get('/uploadPapers',async (req,res)=>{
    const studentPapers = await StudentPapers.find({})
    res.render('admin/studentPapers',{
        StudentPapers: studentPapers,
        name: req.user.username
    })
})

////saving paper to database
router.post('/uploadPapers',upload.single('pastPaper'), async (req,res)=>{
    const file = req.file;
    const paperName  = `${req.body.course} ${req.body.assessmentType} ${req.body.year}${path.extname(file.originalname)}`;
    const SchoolNameEdit = req.body.school.split('(')[1].split(')')[0];
    const result = await s3Uploadv2(file,SchoolNameEdit,paperName);

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
        res.render('admin/studentPapers',{
            StudentPapers: student_Papers,
            message: `${paperName} uploaded successfully`,
            url: "/admin/uploadPapers",
            name: req.user.username
        })
        console.log(studentPapers)   
    }
    catch(err){
        const student_Papers = await StudentPapers.find({})
        res.render('admin/studentPapers',{
            StudentPapers: student_Papers,
            message: "upload wasn't successful",
            url: "/admin/uploadPapers",
            name: req.user.username
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

            await s3.deleteObject({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `uploads/${school}/${singlePaper}`
               }).promise();
            console.log('paper was deleted successfully')
            res.redirect('/admin')
      
    }
    catch(err){
        
        const studentPapers =  await StudentPapers.find({})
        res.render('admin/monitorPage',{
            papers: studentPapers,
            name: req.user.username,
            message: "error deleting paper",
            url: "/admin"
        })
        console.log(err)
    }

})

module.exports = router