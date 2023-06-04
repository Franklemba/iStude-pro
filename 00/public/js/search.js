
/////////////Retrieve the stored data 
const CbuObject = cbuProgrammes
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

    EnterSearch.addEventListener('click', ()=>{
        // alert("it's working")
        if(inputBox.value.length >=  4 ){
            document.getElementById('submitForm').submit()   
        }
    })
    


}

///////////////////////____this function is called once the large search icon is clicked____//////////////////////




////////__this closes the search bar__/////////////////////////

function searchBarClose() {
    document.querySelector('.programmes .searchBar').style.display = 'block';
    document.querySelector('.wrapper').style.display = "none";
    document.querySelector('.programmes .ModalOverlay').style.display = 'none';
}

////////__this closes the search bar__/////////////////////////



