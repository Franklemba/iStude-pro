
////__This stores the University details in the localStorage
fetch('./JSON/CBU.json').then(Response =>Response.json())
.then(data=>{
    let data_serialized = JSON.stringify(data);
    localStorage.setItem('CBU',data_serialized)
})
.catch(error=>{
    console.log("Error on retrieving CBU file");
    console.log(error);
})


    /////////////////////////////////////////

  const CBU_data = JSON.parse(localStorage.getItem("CBU"));

    ////////////////////////////////////////


////_____________________________________for displaying the modal____________________________////
////html modal content
const modalContent = `
<div class="modal">

     <div class="ModalOverlay" onclick='searchBarClose()'></div>

     <div class="UniTitle"><h3>The Copperbelt University</h3></div>

     <div class="imgUni">
                <a class="logo">
                    <img src="/media/cbuLgo.png" alt="">
                </a>
     </div>

     <div class="searchBar" onclick='viewSearchBar()'>
             <i class='fa fa-search'></i>
     </div>

     <div class="wrapper">
        <form action="/search" method="get"  id="submitForm" >
        
                <div class="search-input">
                
                    <input type="text" name="course" placeholder="type course code" id="searchInput" required>
                            <div class="autocom-box">
                                
                            </div>
                            <div class="icon"><i class='fa fa-search'></i></div>
                </div>
        
        </form>

     </div>

     <div class="modalInner">
 
           <div  style=" text-align: center; padding-top: 10px; " class="SchoolLabel"><h1></h1></div>

            <div class="title"><h3>Schools</h3></div>
    
            <div class="accordion">
                
            </div>
    
            <div class="img">
                <a href="index.html" class="logo">
                <img src="./media/iStude.png" alt="">
                </a>
            </div>

            <div class="down_indexb">
                <h3>iStude.org</h3>
            </div>

            <div class="down_indexs">
                <h5>Proudly sponsored by FDTM</h5>
            </div>

     </div>

     <span class="modal-close">&times;</span>

</div>
`;

displayModal = function () {

       ////////////////////////////////////////////////////
       let fish = document.querySelector('.navbar');
        fish.style.visibility = "hidden";

       let showContent = document.querySelector(".modal-bg");
        /////////////////////////////////////////////////////

      
    /////////////////////////////////////////////////////////////////////////////////////
   
    showContent.innerHTML =  modalContent; 
        /////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////
    
      var Xul_accordion = document.querySelector('.accordion');


      CBU_data.forEach(data=>{

          const DATA = data.School.split(' ').join('').slice(8);   ///trim the school name
          // console.log(DATA);
   
            Xul_accordion.innerHTML += `
                    <div class="contentBx">

                        <div class="label" >${data.School}</div>
                    
                        <div class="content" id="${DATA}">
                            <ul>
                                    
                            </ul>
                         </div>
                
                    </div>

                `;
   
            data.programs.forEach(data=>{
                document.querySelector(`#${DATA} ul`).innerHTML+= `<li>${data}</li>`  ///
        
            })
       })
        /////////////////////////////////////////////////////


        /////////////////////////////////////////////////////

        let Modal = document.querySelector(".modal-bg");
        let CoAttriDemo = document.querySelectorAll(".programmes .coAttri ul li");
        let ClickedPrograms = document.querySelectorAll('.content ul li');
        let modalclose = document.querySelector('.modal-close');
        let modalInnerO = document.querySelectorAll(".accordion .contentBx .content");
        let modalInnerI = document.querySelectorAll(".accordion .contentBx.active .content");
        let SchoolLabel = document.querySelectorAll('.label');
        /////////////////////////////////////////////////////


    /////////////////////////////////////////////////////
    Modal.style.visibility = "visible";
    MenuIcon.style.visibility = "hidden";

        modalclose.addEventListener('click', function () {  //eventlistener
            fish.style.visibility = "visible";
            Modal.style.visibility = "hidden";
            MenuIcon.style.visibility = "visible";
            for (var i = 0; i < modalInnerO.length; i++) {
                modalInnerO[i].style.transition = "none";
            }
            for (var i = 0; i < modalInnerI.length; i++) {
                modalInnerI[i].style.transition = "none";
            }
            for (var i = 0; i < CoAttriDemo.length; i++) {
                CoAttriDemo[i].style.color = "red";
            }
        })
        /////////////////////////////////////////////////////

        /////////////////////////////////////////////////////
        
        const accordion = document.getElementsByClassName('contentBx');
        for (i = 0; i < accordion.length; i++) {
            accordion[i].addEventListener('click', function () {
                this.classList.toggle('active')
            })
        }
        /////////////////////////////////////////////////////
        
        /////////////////////////////////////////////////////

        var SchoolLabelName;

        SchoolLabel.forEach(data=>{
            data.addEventListener('click',(e)=>{
        
                SchoolLabelName = e.target.textContent

            })

        })
        /////////////////////////////////////////////////////

        /////////////////////////////////////////////////////

        ClickedPrograms.forEach((data)=>{
            data.addEventListener('click', (e)=>{

                DisplayCourses(e.target.textContent,SchoolLabelName)
                //  console.log(SchoolLabelName)

            })
        })

        /////////////////////////////////////////////////////


}


  



