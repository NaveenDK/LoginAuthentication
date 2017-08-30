var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest:'./uploads'});
var passport = require('passport');
var LocalStrategy =require('passport-local').Strategy;

var User = require('../models/user'); //with out this none of the login functions below will not work

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', function(req, res, next) {
  res.render('register',{title:'Register'});
});
router.get('/login', function(req, res, next) {
  res.render('login',{title:'Login'});
});
//setting up post requests

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid Username or Password'}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    req.flash('success','You are now logged In');
    res.redirect('/');
  });


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});








passport.use(new LocalStrategy(function(username,password,done){
 ////////////////
 User.getUserByUsername(username, function(err, user) {
      if(err) throw err;
      if(!user) {
        return done(null, false, {message: 'Unknown User'});
      }
    
    User.comparePassword(password, user.password, function(err, isMatch) {
      if(err) return done(err);
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
        });

 //////////////
}));

router.post('/register', upload.single('profileimage') ,function(req, res, next) {
// console.log( req.body.name  )
  var name=req.body.name;
  var email= req.body.email;
  var username=req.body.username;
  var password=req.body.password;
  var password2=req.body.password2;
  var User =require('../models/user')


  if(req.file){
     console.log('Uploading file...');
     var profileimage=req.file.filename;
  }else{
     console.log('No file Uploaded');
     var profileimage='noimage.jpg';
  }
 
//Form Validator
req.checkBody('name','Name field is required').notEmpty(); //only the email validation will say something like .isEmail();
req.checkBody('email','Email field is required').notEmpty();
req.checkBody('email','Email is not valid').isEmail();
req.checkBody('username','Username is required').notEmpty();
req.checkBody('password','Password is required').notEmpty();
req.checkBody('password2','Passwords do not match').equals(req.body.password);
//req.checkBody('')

//check Errors
var errors =req.validationErrors();//gathers the errors if there any

if(errors){
 // console.log('Errors');
 res.render('register',{
  errors: errors 
 });
//var User =require('../models/user')--this is used in the below else loop to make it work !
}else{
  var newUser =new User({
      name:name,
      email:email,
      username:username,
      password:password,
      profileimage:profileimage
  });

  User.createUser(newUser,function(err,user) {
    if(err) throw err;
    console.log(user);
  } );

 req.flash('success ','You are now registered and can login');

 res.location('/');
 res.redirect('/');

}

});

router.get('/logout',function(req,res){
  req.logout();
  req.flash('success','You are now loged out ');
  res.redirect('/users/login');

});


module.exports = router;
