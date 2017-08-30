# Login Authentication System Using NodeJS Tech QA Illustration

# 1) What is the procedure you followed in setting up MongoDB as your database?

After Downloading MongoDb ,navigate to where it is installed and once you are in the MOngodb->Server->3.4 you will see bin folder and other files 
now you have to create a folder called Data and also and then a db folder inside it, and create a log folder in the same place as the bin folder
Please note: The mongoDB folder should be in the C:\mongodb or else there will be error thrown for that as well which looks like 'invalid command folder etc..'


# 2) After you set up the above what will be the next step ?
Usually what we do is set the log path ,db path etc using cmd with administrative rights

	Here are the steps
	* First Go into the bin folder in cmd
	* Then type in the following mongod --directoryperdb --dbpath C:\mongodb\data\db --logpath C:\mongodb\log\mongodb.log --logappend --rest --install
	* Then we say or type 'net start MongoDB' then we should get a message saying 'MongoDB service has started successfully'

	After wards we can typein -mongo
	so that will give us a nice shell to type other stuff

	what does typing db do> it will give the database that we are in
	(gives test by default)
	use customers --when typed gives a database named customers
	show dbs -give all the available databases which has something in it
	if we go db.createCollection('customers');
	we get ok -message and also afterwards if we do show dbs we will get customers local as existing dbs
	then we do show collections and we get the available collection

Please note: The mongoDB folder should be in the C:\mongodb or else there will be error thrown for that as well which looks like 'invalid command folder etc..'

# 3) What are the middle ware needed for this write down all them in order you would implement?
 * install express by running:
	npm install -g express
 * install express generator by running:
	npm install -g express-generator
And afterwards we have to create all express stuff by running the following command:
 *express
# 4) what are the other dependencies you would have to type in manually in package.json generated
mongodb -database
mongoose -orm -interact with database
connect-flash //ability to message eg: you are now logged in 
express-messsages //go with the above
express-validator //form validation
passport // login and registration
passport-local //different 
passport-http //modules of passport for eg: facebook etc
multer //allow uploading images
--do npm install for downloading them to your local directory

Now we have to include stuff on the app,js file  we have to have 
npm install express-session --save --we do this on cmd just so that we understand the both ways of adding modules to our project

# 5) What other important lines of code has to be added in the app.js file inorder for the above modules to work ?
Require all of the above files as below:
```		var session = require('express-session');

		var passport = require('passport');

		var LocalStrategy =require('passport-local').Strategy;

		var multer = require('multer');

		var flash = require('connect-flash');

		var mongo = require('mongodb');

		var mongoose= require('mongoose');

		var db=mongoose.connection;
```
Afterwords we can do the following in seperate lines
	```	
//Handle Sessions
		
app.use(session({
  secret:'secret',
  saveUninitialized:true,
  resave:true
}));
//Passport 

app.use(passport.initialize());
app.use(passport.session());


//Validator
// In this example, the formParam value is going to get morphed into form body format useful for printing.

app.use(expressValidator({
  errorFormatter: function(param, msg, value) 
{
 var namespace = param.split('.')
  , root    = namespace.shift()
      , 
formParam = root;

   
 while(namespace.length) 
{
      formParam += '[' + namespace.shift() + ']';
    }

    return {
      param : formParam,
    
  msg   : msg,
      value : value
    };

  }
}));



//above was copied from the express validator middleware code snippet in github
//Middleware for connect-flash- this was also copied from the express-messages github page under connect flash ...something


app.use(require('connect-flash')());

app.use(function (req, res, next) {
res.locals.messages = require('express-messages')(req, res);
  
next();
});

Special Notes--
var upload = multer({dest:'./uploads'}); //this line should be just under ------var multer = require('multer');----

//And also below line should be added in the var require set of code
var expressValidator= require('express-validator');```

-----------------------------------------------------------------------------------------------------------------------------
# PART 2 LAYOUT and VIEWS

First We download bootstrap dist file and copy the js and css files seperately into the public folder and then we have to make the layout.jade file
a bit nice so that it can be extended from all the other view files

# 1) What version of bootstrap are we supposed to use in this project?
 We will go ahead using the old version of bootstrap.js and bootstrap.css files but afterwards we can migrate to the latest version of bootstrap

# 2) Explain the Routing mechanism(architecture) followed in the node js project - in simple terms?
we have index.js users.js in the routes folder and we call it in the app.js file as follows:



var index = require('./routes/index');
var users = require('./routes/users');

var app = express();



app.use('/', index);
app.use('/users', users);

And in the lay out file we have the follows so that it will call the right file at the right time
li(class=(title=='Members'? 'active':''))

              
a(href='/') Members
   //when the above first root / is clicked the index file is viewed as memebers page         
li(class=(title=='register'? 'active':''))
     
        
 a(href='/users/register') Register
    //when we click on the register button the the register view is called and viewd         
li(class=(title=='Login'? 'active':''))
      
       
 a(href='/users/login') Login
          
ul.nav.navbar-nav.navbar-right
           

 li
         
a(href='/users/logout') Logout



# 3)After Views are set and they are working fine we take care of How the Registration Works using Requests How should we do it?
 navigate to the following file routes-->users.js you can see all the get requests has been written in a nice fashion while you understand what they are doing
lets go and see how the post requests are used	---(side note: body parser helps to get variables out from the form -but bodyparser cannot handle pic uploads so thats why
we need multer --so multer is needed on the users.js file) in the post request of the register function we add the third parameter so that the uploads will work fine


# 4) How should the code of post request look like?
router.post('/register', upload.single('profileimage') ,function(req, res, next) {
 console.log( req.body.name  )
});


# 5) How should the form validators work in the backend -illustrate with a code example?
req.checkBody('name','Name field is required').notEmpty(); //only the email validation will say something like .isEmail();

# 4) what kind of code should be there in the register.jade in order to make the errors be responded by the users.js post request (mention at least 2 ways)

ONE WAY
ul.errors
  if errors 
    each error, i in errors
      li.alert.alert-danger #{error.msg}

ANOTHER WAY
  if errors 
    each error, i in errors
      div.alert.alert-danger #{error.msg}

# 6) Creating MODELS using Mongoose

what we need to do when using mongoose
-create modals
-create schemas
First thing we do is we create a models folder in the root and create a file named user.js and connect the mongoose module and the project 

# 7) How can we make the register POST request work whhen the user clicks on the REGISTER BUTTON
//var User =require('../models/user')--this is used in the below else loop to make it work !
}else{
 
 var newUser =new User({
      name:name,
      email:email,
      username:username,
      
password:password,
      profileimage:profileimage
  });

  User.createUser(newUser,function(err,user) 
{
    if(err) throw err;
    console.log(user);
  } );
 res.location('/');
 res.redirect('/');

}


# 8) What would you do to display a success message once the registration is done successfully 

 req.flash('success ','You are not registered and can login');----------add this line before the end of the success loop and before the redirection code and
//in the layout jade file add the following 
!=messages()	

After this we should be able to see the SUccess register in green

# 9) How to hash the password and not save as plain text
by doing npm install bcryptjs --save

and then the following code should be in the user.js file which is under models

module.exports.createUser= function (newUser,callback){

    bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                  
                  newUser.password =hash; 
                  newUser.save(callback); 

             });
        });

  
}


# 10) What does Passport have to do with the Authentication process?

first off we have to have the following in the users.js route --this is the post function


router.post('/login',
  passport.authenticate('local',{failureRedirect:'/users/login',failureFlash:'Invalid Username or Password'}),
 
 function(req, res) {
    // If this function gets called, authentication was successful.
  
  // `req.user` contains the authenticated user.
    
req.flash('success','You are now logged In');
    
res.redirect('/');
  });

Add passport and passport local strategy to the users.js route file copied from the app.js file

and then you will have to have the following --which is the local strateegy 

passport.use(new LocalStrategy(function(username,password,done){
 
////////////////

 User.getUserByUsername(username, function(err, user) {
      
if(err) throw err;
      if(!user) {
     
   return done(null, false, {message: 'Unknown User'});
     
 }
    
    
User.comparePassword(password, user.password, function(err, isMatch) 
{
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


put the serialize and deserialize user above the localstrategy

and we have to create the functions in the model user.js


module.exports.getUserById=function(id,callback){
    User.findById(id,callback);

}

module.exports.getUserByUsername= function(username,callback){
    var query = { username:username};
    User.findOne(query,callback);


}

module.exports.comparePassword = function(candidatePassword,hash,callback){
    // Load hash from your password DB. 
bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    // res === true 
    callback(null,isMatch);

});

}





