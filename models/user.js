const mongoose= require('mongoose');
const mysql=require('mysql');
const bcrypt= require('bcryptjs');
const Sequelize = require('sequelize');
const mysql2=require('mysql2');
const Schema= require('express-validator/check');

var BloodSchema=mongoose.Schema({
    width:{
        type:String,
        required:true,
    },
    height:{
        type:Number,
        required:true,
    },
    blood:{
        type:String,
        required:true,
    },
    Id:{
        type:String,
        required:true,
    }
});


var userSchema=mongoose.Schema({
    work:{
        type:String,
        required:true,
    },
    Id:{
        type:Number,
        isLength: {
            options: { min: 14}
          }
    },
    name:{
        type:String,
        required:true,
    },
    facID:{
        type:String,
        // required:true,
    },
    address:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    faculty:{
        type:String,
        // required:true,
    },
    grade:{
        type:String,
        // required:true,
    },
    phone:{
        type:String,
        required:true,
        isLength: {
            options: { min: 12 }
          }
    },
    password:{
        type:String,
        required:true,
        isLength: {
            options: { min: 8}
          }
    },
    password2:{
        type:String,
        required:true,
        isLength: {
            options: { min: 8 }
          }
    },
    width:{
        type:String,
        default:''
    },
    height:{
        type:String,
        default:''
    },
    blood:{
        type:String,
        default:''
    },
    pressure:{
        type:String,
        default:''
    },
    reye:{
        type:String,
        default:''
    },
    leye:{
        type:String,
        default:''
    },
    diabetes:{
        type:String,
        default: ''
    },
    WBC:{
        type:String,
        default: ''
    },
    RBC:{
        type:String,
        default: ''
    },
    Hemoglobin:{
        type:String,
        default: ''
    },
    MVC:{
        type:String,
        default: ''
    },
    MCH:{
        type:String,
        default: ''
    },
    MCHM:{
        type:String,
        default: ''
    },
    RDW:{
        type:String,
        default: ''
    },
    IPD:{
        type:String,
        default:''
    },
    savedData:{
        type : [Object] ,
      "default" : [{}] 
    }
});

const User=module.exports=mongoose.model('User',userSchema);    

// const Blood=module.exports=mongoose.model('Blood',BloodSchema); 

module.exports.createUser=function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password,salt,function(err,hash){
            newUser.password= hash;
            newUser.save(callback);
        });
    });

}

module.exports.getUserById=function(Id,callback){
    var query={Id:Id};
    User.findOne(query,callback);
}

module.exports.getUserId=function(id,callback){
    User.findById(id,callback);
}

module.exports.comparePassword=function(candidatePassword,hash,callback){
    bcrypt.compare(candidatePassword,hash,function(err,isMatch){
        if(err)throw err;
        callback(null,isMatch);
    });
}