const express = require("express");
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const User = require('../models/userSchema');

router.get("/", (req,res) => {
    res.render("auth/login")
})

router.get("/login", (req, res) => {
    res.render("auth/login");
})

router.get("/signUp", (req, res) => {
    res.render("auth/signUp");
})

router.post("/signUp", async (req,res)=>{
    const {firstName, lastName, email ,school,program, password} = req.body;
  try {
    // Register the user and save to the database
    const user = await registerUser(firstName, lastName, email ,school,program, password);

  req.login(user,async (err) => {
    if (err) {
      console.error(`Error logging in after registration: ${err.message}`);
      return res.render('auth/login');
    }

    console.log(`Username: ${firstName}, Password: ${password}`);
    return res.render('auth/login',{
      user
    });
  });
  }
  catch (error) {
    console.error(`Error registering user: ${error.message}`);
    // Handle registration error (e.g., display an error message)
    res.render('auth/signup', {
      errorMessage: 'Registration failed. Please try again.',
      // Other template variables as needed
    });
  }
})



router.post('/login', (req, res, next)=>{

    passport.authenticate('local', {
      successRedirect: '/schools',
      failureRedirect: '/auth/login',
      failureFlash: true
    })(req, res, next);

});

router.get('/forgot_password', (req,res) =>{
    res.render("auth/forgot_password");
})



async function registerUser(firstName, lastName, email ,school,program, password) {
    try {
      // Generate a salt to use for hashing the password
      const salt = await bcrypt.genSalt(10);
  
      // Hash the password using the salt
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // If a user with the same email exists, throw an error
        throw new Error('Email already exists');
      }
      // Create a new user document with the hashed password
      password = hashedPassword;
      const user = new User({
        firstName, lastName, email ,school,program, password});
  
      await user.save();
      // Save the user document to the database
      console.log(`User ${firstName} registered successfully`);

      return user;
      

    } catch (error) {
      console.error(`Error registering user: ${error.message}`);
    }
}
  


  router.get('/logout', (req, res) => {
    // Destroy the user session to log them out
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        // Handle error as needed
        res.status(500).send('Internal Server Error');
      } else {
        // Redirect the user to the login or home page
        res.redirect('/'); // You can replace '/' with the desired destination
      }
    });
  });

  
module.exports = router;