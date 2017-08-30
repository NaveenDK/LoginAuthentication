var mongoose=require('mongoose');
var bcrypt= require('bcryptjs');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';

mongoose.connect('mongodb://localhost/PROJECTFORLOGIN');

var db = mongoose.connection;

//UserSchema
var UserSchema = mongoose.Schema({
    username:{
        type:String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type:String
    },
    profileimage:{
        type:String
    }

});

var User =module.exports =mongoose.model('User',UserSchema);

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

module.exports.createUser= function (newUser,callback){

    bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(newUser.password, salt, function(err, hash) {
                  
                  newUser.password =hash; 
                  newUser.save(callback); 

             });
        });

  
}