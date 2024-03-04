let DisplayCourses =(data,SchoolLabelName)=>{


    ////////////________///////////////////

       const title = document.querySelector('.title h3');
       const accordion = document.querySelector('.accordion');
       const allCoursesArray = [];
       const YearArray = [];
       const SchoolLabel = document.querySelector('.SchoolLabel h1');

    /////////////________//////////////

    /////////////________//////////////    
        CbuObject.forEach(school=>{
            school.programs.forEach(program=>{
                if(program.programName == data){
                    programName = program.programName;
                    program.COURSES.forEach(data=>{
                        YearArray.push(data.year);
                        data.courses.forEach(data=>{
                            allCoursesArray.push(data)
                            // console.log(data);
                        })

                        
                    })
                    return false;
                }
            })
        })
        // console.log(allCoursesArray)
    /////////////________//////////////

     /////////////////////________///////////////////

        title.textContent = programName;
        SchoolLabel.textContent = SchoolLabelName;
        accordion.classList.add('courses');
        // accordion.innerHTML = `<span onclick="displayModal()" class='back_button'>
        // <a href="#"><i class="bi bi-arrow-left-square-fill"></i></a></span> `;
        const YearList = document.createElement("div");
        const CourseList = document.createElement("div");
        YearList.classList.add('yearList');
        CourseList.classList.add('courseList');
        accordion.appendChild(CourseList);
        accordion.appendChild(YearList);
        
      /////////////////////________///////////////////


        /////////////////////________///////////////////

        YearArray.forEach(data=>{
            document.querySelector('.yearList').innerHTML += `<li onclick="ClickedYear('${programName}','${data}','${SchoolLabelName}')"><h1>${data}</h1></li>`
        })

        allCoursesArray.forEach(data=>{
    
            document.querySelector('.courseList').innerHTML += `<a href="schools/${data}"><li><h2>${data}</h2></li></a>`
        })

          /////////////////////________///////////////////


        /////////////________//////////////
            var DisplayAllCourses = document.querySelector('.accordion.courses');
            DisplayAllCourses.addEventListener('click',(e)=>{

                    let details = e.target.classList;

                    if(details == 'accordion courses'){
                        document.querySelector('.courseList').innerHTML  = ` `;
                        allCoursesArray.forEach(data=>{
                            document.querySelector('.courseList').innerHTML += `<a href="schools/${data}"><li><h2>${data}</h2></li></a>`
                        })
                        document.querySelectorAll('.yearList li h1').forEach(data=>{
                            data.style= `
                            border-bottom: none;
                            `
                        })
                        
                    }else{
                        return false;
                    }
                    
                
            })
         /////////////________//////////////
}

/////////____________________FOR THE SEARCH ICON WHEN CLICKED_______________________//////////

//////////////_________this function is called once a year is clicked___________////////////////

var ClickedYear = (programName,year)=>{

    ///////_________///////

        var ClickedYear = document.querySelectorAll('.yearList li h1');
        const courseList = document.querySelector('.courseList');
        const allCoursesArray = [];
        const YearArray = [];

   ///////_________///////

    ////////_________///////
        ClickedYear.forEach(data=>{
            data.style= `
            box-shadow: 0;
            `
            if(data.textContent == year){
                data.style = `
                box-shadow: 0 5px 15px rgba(0, 0, 0, 2.5);
                `
            }
        })
    ///////_________///////

    /////////////________//////////////
        CbuObject.forEach(school=>{
            school.programs.forEach(program=>{
                if(program.programName == programName){
                    programName = program.programName;
                    program.COURSES.forEach(data=>{
                        YearArray.push(data.year);

                        if(data.year == year){

                            data.courses.forEach(data=>{
                                allCoursesArray.push(data)
                            })
                        }
                    })
                }
            })
        })
    /////////////________//////////////

    ///////_________///////
        courseList.innerHTML = ` `;  
        allCoursesArray.forEach(data=>{
            courseList.innerHTML += `<a href="schools/${data}"><li><h2>${data}</h2></li></a>`
        })
    ///////_________///////
}
//////////////_________this function is called once a year is clicked___________////////////////
