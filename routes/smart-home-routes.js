'use strict';

const express = require('express');
const app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);


const session = require('express-session')

const router = express.Router();


router.use(
  express.urlencoded({
    extended: true
  })
)


const passport=require('passport')


//passport middleware for user sign in

const LocalStrategy = require('passport-local').Strategy
let authUser = (email, password, done) => {
  //Search the user, password in the DB to authenticate the user
  //Let's assume that a search within your DB returned the username and password match for "Kyle".
  //login
  console.log('authUser')
  //from signUser validates the login data
  deviceController.signUser(email,password,(err,auth)=>{
    console.log('after signUser the auth')
    console.log(auth)
    done(null,auth)
  })

     
}


//passing the new local steategy to passport
passport.use(new LocalStrategy(authUser))

//serialize user
passport.serializeUser( (user, done) => { 
  console.log(`--------> Serialize User`)
  console.log(user)     

  done(null, user)


} )

//deserialize user
passport.deserializeUser((user, done) => {
      console.log("---------> Deserialize Id")
      

      done (null, {name: user.username, id: user.userid,admin:user.admin} )      

}) 
//-------------

// insert cookies

router.use(session({
  secret: "secret",
  cookie:{maxAge:60*24*15},
  resave: false ,
  saveUninitialized: true ,
}))
//the functions the router uses
router.use(passport.initialize());
router.use(passport.session())
//---------

const bodyParser = require('body-parser');
router.use(express.json());
router.use(express.urlencoded())
router.use(bodyParser.json());
router.use(express.json())

//const deviceController = require('../controller/weight-app-controller');

const deviceController = require('../controller/smart-home-controller');
router.use(express.json());

//when the client requests a URI, the corresponding controller function will be called
const Pool = require("pg").Pool;
require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";
const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});




//APPLICATION'S ROUTES --------------------------------------------------

//get requests------------------------------------




router.get('/',deviceController.index)
router.get('/user_homes',deviceController.user_homes)
router.get('/admin',(req,res)=>{
  console.log(req.session)
  let a
  if(req.session.admin==true){
       a={admin:1}
       res.render('admin',a)
  }
  else{
    a={}
    res.redirect('/login')
  }
 
  
})

router.get('/online',(req,res)=>{
  res.render('online')
})
router.get('/home_living/:id/',deviceController.home_living)
router.get('/home_living/:room/:id/',deviceController.room)



router.post('/sock/submit/:home/',deviceController.tog)
router.post('/lamp/submit/',deviceController.tog_ran)
router.post('/lamp/color/',deviceController.color_post)
router.post('/add-device',deviceController.add_device)





  //9 get login page
router.get('/login',(req,res)=>{
  if(req.session.admin==true){
    res.render('login',{admin:1})
  }
  else{
    res.render('login')
  }
  
})

  //10 get register page
router.get('/register',(req,res)=>{
  
  res.render('register')
})




  //11 log out user
router.get('/logout',(req,res)=>{
  // console.log(user_det)
  req.session.loggedin = false;
  req.session.onoma =null;
  req.session.user_id =null;
  req.session.admin =null;
  // response.redirect('/')
  // req.session.sign
  res.redirect('/')
})

 router.post('/register_user/',deviceController.registerUser)


router.post('/login_user/',deviceController.signUser)


exports.routes = router;
exports.io=io;
exports.app=app
exports.http=http
