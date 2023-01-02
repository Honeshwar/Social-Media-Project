const express = require('express');
const passport = require('passport');

const router = express.Router();
// console.log(`Router2 is running `);
// controller  action import
const userController = require('../controllers/user_controllers');

//passport.checkAuthentication 
router.get('/profile/:id',passport.checkAuthentication,userController.profile);// always check for auth. before passing req to controllers
//same can use again Mw and move req to another router (start with /profile/change)

//update
router.post('/update/:id',passport.checkAuthentication,userController.update);

router.get('/email',userController.email);

// for signUp and signIn get request
router.get("/signUp",userController.signUp);
router.get("/signIn",userController.signIn);

// for signUp and signIn post request
router.post("/create",userController.create);

router.post("/create-session",passport.authenticate(
    "local",
    {failureRedirect:"/user/signIn"}
),userController.create_session);


//for sign out
router.get("/signOut",userController.destroySession);


module.exports = router; 