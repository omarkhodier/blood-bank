const localStrategy= require('passport-local').Strategy;
const user= require('../models/user');
const config = require('../config/database');
const bycrpt= require('bcryptjs');


let User=require('../models/user');

module.exports= function (passport){
  
    //local strategy
  
    passport.use(new localStrategy(function(Id,password,done){
       
        //match id
       
        let query ={Id:Id};
        user.findOne(query,function(err,user){
            if(err)throw err;
            if(!user){
                return done(null, false,{message:'no user found'});
            }

            //match password
            bycrpt.compare(password,user.password,function(err,isMatch){
                if(err)throw err;
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null, false,{message:'wrong password'});
                }
            });
        });
    }));

        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
        
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
            done(err, user);
            });
        });
}