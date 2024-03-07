const express = require('express')
const router = express.Router();
const StudentPapers = require('../models/StudentUploadSchema');

//////school page
router.get('/', async (req,res)=>{

    const user = req.user;
    const SchoolNameEdit = user.school.split('(')[1].split(')')[0];
    let availaiblePastPapers;

    if(user.accountType === 'freeTier'){

             availaiblePastPapers = await StudentPapers.find({
                school: SchoolNameEdit,
                program: user.program,
                assessmentType: 'test 1'
            });
    }else{

        availaiblePastPapers = await StudentPapers.find({
            school: SchoolNameEdit,
            program: user.program,
        });
    }

    res.render('schools/school',{
        availaiblePastPapers,
        user
    })

})

////download page
router.get('/:course',async (req,res)=>{

    const Course = req.params.course
    const CourseEdit = Course.toUpperCase()
    const searchQuery = req.query.course;
    const user = req.user;
    let studentPapers;

    if(searchQuery){

        const searchQueryEdit = searchQuery.trim().toUpperCase().split(' ')[0]
        const studentPapers = await StudentPapers.find({
            course:searchQueryEdit
        })

        res.render('schools/downloadPage',{
            content:studentPapers,
            user: req.user
        })
        
    }else if(Course === 'upgrade'){  
        

        if(user.accountType === 'freeTier'){
            res.render("schools/premiumUpgrade",{
                user: req.user
            }) 
        }else{
            res.redirect('/schools');
        }

    }else{

        if(user.accountType === 'freeTier'){

            studentPapers = await StudentPapers.find({
                course:CourseEdit,
                program: user.program,
                assessmentType: 'test 1'
           });
        }else{

            studentPapers = await StudentPapers.find({
                course:CourseEdit,
                program: user.program
            });
        }

        
        
        res.render('schools/downloadPage',{
            content: studentPapers,
            user: req.user
        })

    }
    
})


router.get('/:course/:assessment',async (req,res)=>{

    const Course = req.params.course;
    const pastPaperPdf = req.params.assessment;

    // res.send(assessment);
    res.render('schools/paperPreviewPage',{
        pastPaperPdf,
        user: req.user
    })
    
})




module.exports = router
