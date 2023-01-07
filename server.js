const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const AdminUsers = require('./models/registerSchema')



const initializePassport = require('./passport-config')

 async function fetchUser(){
  const users = []
  const Admin_users = await AdminUsers.find()
      Admin_users.forEach(data=>{
          users.push(data)
      })

      initializePassport(
        passport,
        username => users.find(user => user.username === username),
        id => users.find(user => user.id === id)
    )
    
      // console.log(users)
}

  fetchUser();




//////////////database connection////////////

///mongodb+srv://franklemba:kU3XmafGzdHYYzfX@cluster0.xnljw5s.mongodb.net/?retryWrites=true&w=majority
 //mongodb://localhost:27017/iStude_Pro
   mongoose.connect('mongodb+srv://franklemba:kU3XmafGzdHYYzfX@cluster0.xnljw5s.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('database is connected')
   }).catch((err)=> console.log('error connecting to database ',err))
 
//////////////database connection////////////


//////setting up the server///////

  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views/')
  app.set('layout','layouts/layout')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(expressLayouts)
  app.use(express.static(__dirname + '/public/'))
  app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//////setting up the server///////

//////////////importing routers ////////////

const homeRouter = require('./routes/index')
const schoolRouter = require('./routes/schools')
const adminRouter = require('./routes/admin')

//////////////importing routers ////////////

app.use('/',homeRouter)
app.use('/schools',schoolRouter)
app.use('/admin',checkAuthenticated,adminRouter)


///register page
app.get('/register', checkNotAuthenticated,(req,res)=>{
  res.render('admin/register')
})

app.post('/register', checkNotAuthenticated,async (req,res)=>{

  try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const Admin_users = new AdminUsers({
        id: Date.now().toString(),
          school: req.body.school,
          username: req.body.username,
          password: hashedPassword
      })
    await Admin_users.save()
    console.log(Admin_users)
    res.redirect('/login')
  }catch(err){
    res.redirect('/register')
    console.log(err)
  }
  
})

///login page
app.get('/login', checkNotAuthenticated,(req,res)=>{
  res.render('admin/login')
})

app.post('/login', checkNotAuthenticated,passport.authenticate('local',{
  successRedirect: '/admin',
  failureRedirect: '/login',
  failureFlash: true
}))

function checkAuthenticated(req, res, next){
  if(req.isAuthenticated()){
     return next()
  }
  res.redirect('/login')
}


function checkNotAuthenticated(req, res, next){
  if(req.isAuthenticated()){
   return res.redirect('/admin')
 }
   next()
}








app.listen(process.env.PORT || 3007)