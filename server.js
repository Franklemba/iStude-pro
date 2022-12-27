const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//////////////importing routers ////////////

const homeRouter = require('./routes/index')
const schoolRouter = require('./routes/schools')
const adminRouter = require('./routes/admin')

//////////////importing routers ////////////


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

//////setting up the server///////



app.use('/',homeRouter)
app.use('/schools',schoolRouter)
app.use('/admin',adminRouter)


app.listen(process.env.PORT || 3007)