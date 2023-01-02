// const express = require('express');
// // here require not import an new express module ( not create an new instance express module) , here same instance of express module is require that firstly require at index.js(main) file 

// // that done automatically by Node.js
// // one module only  once  is been imported entire project
// // if we import again than same instance is share in that file
// // that done automatically by Node.js

// const router = express.Router();
// //class constructor call an obj create and exports to main index.js
// // it divide router from controllers
// console.log(`Router is running :`` ${router}`)

// module.exports = router;

// _______________________

const express = require('express');
const router = express.Router();

//not work here
// const app = express();
// // an parser to store req thing in body object 
// app.use(express.urlencoded());

//have to import controller action (function) for router ,present separate folder
const homeController = require('../controllers/home_controller')

const passport = require("passport");


// console.log(`Router is running : ${router}`)

router.get('/',passport.checkAuthentication,homeController.home);
router.get('/profile',passport.checkAuthentication,homeController.profile);
// router.get('/profile',homeController.profile);

//middle ware (layer) is create to so we can access outside routers
router.use('/user',require('./users_router'));// /user/profile than it work (use())

//here we require (import) an middleware function from user.js where we exports router that  router provide that MW function
//that MW move request to further /user/profile


router.get('/user',passport.checkAuthentication,homeController.user);

// router.post('/signup',homeController.signup)

// use MW to go to next router
router.use('/post',require("./posts_router"));

//for comment router
router.use('/comment',require('./comments_router'))

module.exports = router;