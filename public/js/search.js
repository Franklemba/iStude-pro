


///____This stores the school details in the localStorage
fetch('/JSON/cbuZit.json').then(response=> response.json())
   .then(data=>{
    let data_serialized = JSON.stringify(data);
        localStorage.setItem('CbuObject', data_serialized)
        // console.log(data)
   })
   .catch(error=>{
    console.log("Error on retrieving file");
    console.error(error);
    alert('error in accessing file, please reload site');
   })


/////////////Retrieve the stored data 
const CbuObject = JSON.parse(localStorage.getItem("CbuObject"));
// console.log(CbuObject)


///////////////////////____this function is called once the large search icon is clicked____//////////////////////
let viewSearchBar = () =>{


    //////////////////////////////////////////////////////

    var inputBox = document.getElementById('searchInput');
    const searchWrapper = document.querySelector('.search-input');
    const suggBox = searchWrapper.querySelector('.autocom-box');
    const EnterSearch = searchWrapper.querySelector('.icon i');
    document.querySelector('.programmes .searchBar').style.display ='none';
    document.querySelector('.wrapper').style.display = "block";
    document.querySelector('.programmes .ModalOverlay').style.display = 'flex';

    /////////////////////////////////////////////////////


    inputBox.onkeyup =(e) =>{
        let userData = e.target.value;
        
        let allCoursesArray = [];
      
            ///////////////____////////////////

                

     CbuObject.forEach(school=>{
        school.programs.forEach(program=>{
            // if(program.programName == data){
                programName = program.programName;
                program.COURSES.forEach(data=>{
                    // YearArray.push(data.year);
                    data.courses.forEach(data=>{
                        allCoursesArray.push(`${data} ${program.programName}`)
                        // console.log(data);
                    })

                    
                })
                // return false;
            // }
        })
    })
    /////////////________//////////////
                       
            if(userData){
                       allCoursesArray = allCoursesArray.filter((data)=>{
                            return data.toLocaleUpperCase().includes(userData.toLocaleUpperCase().trimStart());
                        });
                        allCoursesArray = allCoursesArray.map((data)=>{
                            return data = `<li>${data}</li>` 
                        });

                        searchWrapper.classList.add('active');  //show autocomplete box
                        showSuggestions(allCoursesArray);
                        let allList = suggBox.querySelectorAll("li");
            
                        for(let i = 0; i < allList.length; i++){
                            //adding onclick attribute in all li tags
                            allList[i].addEventListener('click', ()=>{
                                select(allList[i]);
                                userData = allList[i];
                            })
                            
                        }

                        function select(element){
                            let selectUserData = element.textContent;
                            inputBox.value = selectUserData; //passing the user selected list item data in textfield
                            console.log(selectUserData);
                        }
                    }else{
                        searchWrapper.classList.remove('active'); 
                    }

        
}


    



   /////////////////////manipulates and examines the data inserted by the user in the input section///////

    EnterSearch.addEventListener('click', ()=>{
        let inputBox = document.getElementById('searchInput');

   

         ////////////________///////////////////
         
           let allCoursesArray = [];
           let userData = inputBox.value.toLocaleUpperCase().trimStart();
           let NewSchool;
        /////////////________///////////////

         ///////////////____////////////////

         CbuObject.forEach(school=>{
             school.programs.forEach(program=>{
             
                     program.COURSES.forEach(data=>{
                         // YearArray.push(data.year);
                         data.courses.forEach(data=>{
                             allCoursesArray.push(`${data} ${program.programName}`)

                             if(userData.includes(data)==true){   /// checks or the data inserted by the user matching any data in the ___allCoursesArray array
                                NewSchool = school.school;
                               allCoursesArray.push(`${data.toLocaleUpperCase()} ${program.programName.toLocaleUpperCase()}`)
                                if(userData == `${data.toLocaleUpperCase()} ${program.programName.toLocaleUpperCase()}` || userData == data.toLocaleUpperCase().trimStart()){
                                   DemoFimo.setDemo(data,program.programName,NewSchool);
                                   return false;
                               }
                               console.log(school);        
                               return false;
                               }
                         })
     
                         
                     })
                    
             })
         })
         /////////////________//////////////
    
    
   
       })

    // })

   /////////////////////manipulates and examines the data inserted by the user in the input section///////




    /////////////////___this function displays out the suggestions___/////////////

  let showSuggestions=(list)=>{
        let listData;
        if(!list.length){
            userValue = inputBox.value;
            listData = `<li>${userValue}</li>`;
        }else{
            listData = list.join('');
        }
        suggBox.innerHTML = listData;
    }

    ///////////////__this function displays out the suggestions___/////////////

}

///////////////////////____this function is called once the large search icon is clicked____//////////////////////




////////__this closes the search bar__/////////////////////////

function searchBarClose() {
    document.querySelector('.programmes .searchBar').style.display = 'block';
    document.querySelector('.wrapper').style.display = "none";
    document.querySelector('.programmes .ModalOverlay').style.display = 'none';
}

////////__this closes the search bar__/////////////////////////



