require("dotenv").config()
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
// const AdminUsers = require('./models/registerSchema')
const Users = require('./models/userSchema');
// const initializePassport = require('./passport-config')
const methodOverride = require('method-override')
const fs = require('fs')
const path = require('path')
const { ensureAuthenticated } = require('./config/auth');
require('./config/passport')(passport);
//////////////importing routers ////////////

const homeRouter = require('./routes/index')
const schoolRouter = require('./routes/schools')
const adminRouter = require('./routes/admin')
const authRouter = require('./routes/auth');

////////////// importing routers ////////////


//////////////database connection////////////

mongoose.connect(process.env.database_Url).then(()=>{
  console.log('database is connected')
}).catch((err)=> console.log('error connecting to database ',err))

//////////////database connection////////////

//////setting up the server///////

  app.set('view engine', 'ejs')
  app.set('views', __dirname + '/views/')
  app.set('layout','layouts/layout')
  app.use(expressLayouts)
  app.use(express.static(__dirname + '/public'))
  
  app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))
  app.use(express.urlencoded({ extended: false }))
  app.use(methodOverride('_method'))
  app.use(session({
    secret: process.env.flash_secret,
    resave: false,
    saveUninitialized: false
  }))

  app.use(flash())
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));



// Route to serve PDF files
app.get('/uploads/:file', (req, res) => {
  const filePath = path.join(__dirname, 'public/uploads', req.params.file);
  console.log('filePath: '+ filePath);
  res.setHeader('Content-Disposition', 'attachment'); // Set content disposition to inline
  res.sendFile(filePath);
});

//////setting up the server///////

app.use('/',homeRouter)
app.use('/schools', ensureAuthenticated, schoolRouter)
app.use('/admin',adminRouter)
app.use('/auth',authRouter);



app.listen(process.env.PORT || 3007,()=> console.log('Server is Running'));
