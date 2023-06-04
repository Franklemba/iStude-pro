let MenuIcon = document.querySelector('.menuIcon')
let navbar = document.querySelector('.navbar');
let overlay = document.querySelector('.overLay');

var check = true;
var XulOptionsCheck = true;
var XulOCheck = true;


MenuIcon.onclick = () =>{
    
     if(XulOCheck == true){
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        MenuIcon.classList.add('active');
        XulOCheck = false;
     }else
     {
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        MenuIcon.classList.remove('active');
        XulOCheck = true;
     }

}  
    

overlay.addEventListener('click',()=>{
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    MenuIcon.classList.remove('active');
    XulOCheck = true;
})

if(XulOptionsCheck == true){
    document.querySelector('.XulOptions').onclick = () =>{
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        MenuIcon.classList.remove('active');
        XulOCheck = true;
    }
    XulOptionsCheck = false;
}else if(XulOptionsCheck==false){
    document.querySelector('.XulOptions').onclick = () =>{
        navbar.classList.remove('active');
        overlay.classList.remove('active');
        MenuIcon.classList.remove('active');
        XulOCheck = true;
    }
    XulOptionsCheck = true;
}

 var fugo = function(){
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    MenuIcon.classList.remove('active');
    XulOCheck = true;
 } 
 var fugoX = function(){
    navbar.classList.remove('active'); 
    overlay.classList.remove('active');
    MenuIcon.classList.remove('active');
    XulOCheck = true;
 }

 let alertFunction = function(){
     alert('Still under construction, will be available soon');
 }

window.onscroll = () =>{
    navbar.classList.remove('active');
    overlay.classList.remove('active');
    MenuIcon.classList.remove('active');
    XulOCheck = true;
}


