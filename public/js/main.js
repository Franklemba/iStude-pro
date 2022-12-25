
// object for the course attributes
let CourseAttribute = ['Assignment','Quiz','Sessional','Test 1','Test 2']

//////////////////////////////////////////////////////////////////////////////////////////
DemoFimo = {
        setDemo: function(courseName,NewSchoolName,school){
            this.CourseInnerChange(courseName,NewSchoolName,school);
        },
        
        CourseInnerChange: function(courseName,NewSchoolName,school){  

                NewCourseName = courseName;
                searchBarClose();  ///function dealing with the search system implementation
                const SchoolLabel = document.querySelector('.SchoolLabel h1');
                let demo = document.querySelector('.accordion');

                demo.classList.remove('courses')
                let backController;

                switch(school){
                    case 'SICT':
                        school = 'School of Information & Communication Technology ';
                        break;
                    case 'SBE':
                        school = 'School of the Built Environment';
                        break;
                    case 'SofB':
                        school = 'School of Business';
                        break;
                    case 'BENG':
                        school = 'School of Engineering';
                        break;
                    case 'SMNS':
                        school = 'School of Mathematics and Natural Science';
                        break;
                    case 'SMMS':
                        school = 'School of Mines and Mineral Science';
                        break;
                    case 'SNR':
                        school = 'School of Natural Resources';
                        break;
                    default:
                        break;
                }

                SchoolLabel.textContent = school;
                document.querySelector(".title").innerHTML = '<h3>'+NewSchoolName+'</h3>';
                        backController =  `<span onclick="DisplayCourses('${NewSchoolName}','${school}')" class='back_button'>
                        <a href="#"><i class="bi bi-arrow-left-square-fill"></i></a></span>`;
                
                        const ListPapers = document.createElement("div");
                        ListPapers.classList.add('ExamPapers');

                demo.innerHTML = `${backController}
                <div class="fish"><h3>${courseName} </h3></div>
                <div class='CourseAttrib'>
                    
                </div>
                
                `;


                let CourseAttrib = document.querySelector('.CourseAttrib');
                CourseAttribute.forEach(data=>{
                    CourseAttrib.innerHTML += `<p onclick='PastPaper.papers("${data.toLowerCase()}","${courseName}")'>${data}</p>`
                })
            
                demo.appendChild(ListPapers)
                PastPaper.papers("sessional",`${courseName}`)
        }
    
}
    


       ///////////////_______this function is meant to display the past papers accordingly_______/////////
 PastPaper = {
    papers: function(CourseAttribute,courseName){
        this.PapersView(CourseAttribute,courseName);
    },

    PapersView: function(CourseAttribute,courseName){

        document.querySelector('.loaderBox').style.display = 'flex'    //for the loading page
        document.querySelector('.loaderBox').style.opacity = 1       //for the loading page

        NewCoName = NewCourseName;
        let NewSchool;
        let CourseAttrib = document.querySelectorAll('.CourseAttrib p');

            CourseAttrib.forEach(data=>{
                    data.style = `
                    box-shadow: 0 ;
                    `
                if(data.textContent.toLocaleLowerCase() == CourseAttribute.toLocaleLowerCase())
                {
                    data.style = `
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 2.5);
                    `;

                }
            })


                ////////////________///////////////////
                CbuObject.forEach(school=>{
                    school.programs.forEach(program=>{
                
                            program.COURSES.forEach(data=>{
                    
                                data.courses.forEach(data=>{
                                    // allCoursesArray.push(`${data} ${program.programName}`)
                                    if(courseName == data){
                                        NewSchool = school.school
                                    }
                                    // console.log(data);
                                })
            
                                
                            })
                    })
                })
                ////////////________///////////////////


                 
        ///////////////////////////_______/////////////////////////////////////////
                
            //this function holds the past papers
            let russianDemo = document.querySelector('.ExamPapers');
            
            russianDemo.innerHTML = `
            <div class="fish"><h3> ${CourseAttribute} papers</h3></div>
            <div class='paperView'></div>
            `;
    
                    //this function fetches the papers and displays them in the past paper holder
                    fetch(`School/${NewSchool}/${NewCourseName}/${CourseAttribute}/data.json`)
                    .then(response=> response.json())
                    .then(function(data){

                                let paperView = document.querySelector(".paperView");
                                paperView.innerHTML = "<p><h4>Click to download</h4></p>";
                            
                            /////////////////////////////////////

                                data.forEach(data=>{
                                    paperView.innerHTML += 
                                    `<a  href='School/${NewSchool}/${NewCourseName}/${CourseAttribute}/${data}.pdf' download>
                                    <ul>
                                        <li><i class="bi bi-file-earmark-pdf-fill">${data}</i></li>
                                        <li><div class="fa fa-download" id="download-btn"></div></li>
                                    </ul>
                                    </a>`;
                                })

                            /////////////////////////////////////

                                document.querySelector('.loaderBox').style.display = 'none'
                                document.querySelector('.loaderBox').style.opacity = 0

                        
                    })
                    .catch(function(error){
    
                        document.querySelector(".paperView").innerHTML = `
                               <div class='Non_Paper'>
                               <p>${CourseAttribute} papers Not yet Available</p>
                               </div>
                               `;

                        document.querySelector('.loaderBox').style.display = 'none'
                        document.querySelector('.loaderBox').style.opacity = 0
                        console.log('Error :', error)

                    });
    
            /////////////////////////////________/////////////////////////////////////////
            
    }
}




document.querySelector('.loaderBox').style.display = 'none'

window.onload = function(){
    
        document.querySelector('.loaderBox span .logo img').style.opacity = 1;
        setTimeout(function(){
            // document.querySelector('.schoolz').style.opacity = 1 
            document.querySelector('.menuIcon').style.opacity = 1
            document.querySelector('.home').style.opacity = 1
            document.querySelector('.about').style.opacity = 1
            document.querySelector('.contact').style.opacity = 1
            document.querySelector('.footer').style.opacity = 1
            document.querySelector('.header .logo img').style.opacity = 1
            document.querySelector('.menuIcon').style.opacity = 1
            document.querySelector('.loaderBox').style.display = 'none'
        },10)
}
    















































