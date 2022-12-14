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
const methodOverride = require('method-override')

//////////////importing routers ////////////

const homeRouter = require('./routes/index')
const schoolRouter = require('./routes/schools')
const adminRouter = require('./routes/admin')

//////////////importing routers ////////////

async function fetchUser(){
  const Admin_users = await AdminUsers.find()

  if(users.length == 0){
      Admin_users.forEach(element=>{
        users.push(element)
      })
  }else if(users.length > Admin_users.length ){
      users = []
      Admin_users.forEach(element=>{
        users.push(element)
      })
  }
   initializePassport(
     passport,
     username => users.find(user => user.username === username),
     id => users.find(user => user.id === id)
    )
    // console.log(Admin_users)
    // console.log(users)
}

let users = []


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
  app.use(expressLayouts)
  app.use(express.static(__dirname + '/public/'))
  app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))

//////setting up the server///////

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
      users.push({
        id: Date.now().toString(),
          school: req.body.school,
          username: req.body.username,
          password: hashedPassword
      })
    await Admin_users.save()
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


app.delete('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});
//////////authentication function ///////////

  fetchUser();

//////////authentication function ///////////


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