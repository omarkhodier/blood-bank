const express=require('express');
const router =express.Router();
const http   =require('http');
const bcrypt = require('bcryptjs');
const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const date = require('date-and-time');
//bring in user model
let User = require('../models/user');
let Blood=require('../models/medicalRecord');
// register
router.get('/signup',function(req,res){
    res.render('/signup')
});
//login
router.get('/login',function(req,res){
    res.render('login');
});


// register post
router.post('/signup',function(req,res){
    const work =req.body.work;
    const Id=req.body.Id;
    const name=req.body.name;
    const facID=req.body.facID;
    const address=req.body.address;
    const age=req.body.age;
    const faculty=req.body.faculty;
    const grade=req.body.grade;
    const phone=req.body.phone;
    const password=req.body.password;
    const password2=req.body.password2;

    //validation
    req.checkBody('work','work is required').notEmpty();
    req.checkBody('Id','Id is not valid').notEmpty().isLength({min:14});
    req.checkBody('name','name is required').notEmpty();
    // req.checkBody('facID','facID is required').notEmpty();
    req.checkBody('address','address is required').notEmpty();
    req.checkBody('age','age is required').notEmpty();
    req.checkBody('phone','number is not valid').notEmpty().isLength({min:11});
    req.checkBody('password','password is not valid').notEmpty().isLength({min:8});
    req.checkBody('password2','password is not match').equals(req.body.password);
    var errors=req.validationErrors();
    console.log(req.body.work)
    

    


    if(errors){
        res.render('signup',{ 
            errors:errors
        });
        
        console.log(errors);
    }else{
        var newUser = new User({
            work:work,
            Id:Id,
            name:name,
            facID:facID,
            address:address,
            age:age,
            faculty:faculty,
            grade:grade,
            phone:phone,
            password:password,
            password2:password2,
        });
        
        bcrypt.genSalt(10,function(err,salt){
            bcrypt.hash(newUser.password,salt,function(err,hash){
                if(err){
                    console.log(err)
                }
                newUser.password= hash;
                newUser.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        req.flash('success','you are now registering and can login');
                        res.redirect('/login');
                    }
                }); 
            });
        });

        
    }
});
//physician form
router.post('/physician',function(req,res){
    const Id=req.body.Id;
    const width=req.body.width;
    const height=req.body.height;
    const blood=req.body.blood;
    const pressure=req.body.pressure;
    const reye=req.body.reye;
    const leye=req.body.leye;
    const diabetes=req.body.diabetes;
    const WBC=req.body.WBC ;
    const RBC=req.body.RBC ;
    const Hemoglobin=req.body.Hemoglobin ;
    const MVC=req.body.MVC ;
    const MCH=req.body.MCH ;
    const MCHM=req.body.MCHM;
    const RDW=req.body.RDW ;
    const IPD=req.body.IPD;
    

    if( req.body.userId != '' && req.body.height !='' && req.body.blood !=''){
        User.findOneAndUpdate({Id:req.body.userId},{ 
        width:req.body.width,
        height:req.body.height,
        blood:req.body.blood,
        pressure:req.body.pressure,
        reye:req.body.reye,
        leye:req.body.leye,
        diabetes:req.body.diabetes,
        WBC:req.body.WBC ,
        RBC:req.body.RBC ,
        Hemoglobin:req.body.Hemoglobin ,
        MVC:req.body.MVC ,
        MCH:req.body.MCH ,
        MCHM:req.body.MCHM ,
        RDW:req.body.RDW ,
        IPD:req.body.IPD ,
    }).then({
        }).catch(err=>{
            throw err;
        })    


        User.find({work:'Student'}).then(user_records=>{
            console.log(user_records);
            res.render('physician',{user_records:user_records}); 
            res.end()
        }).catch(err=>{
            throw err;
        });
    }

    if(req.body.searchId != ''){
        User.find({work:'Student'}).then(user_records=>{
            console.log(user_records);
            res.render('physician',{user_records:user_records}); 
            res.end()
        }).catch(err=>{
            throw err;
        });
    }
    
});

router.post('/physician/search',function(req,res){
    User.find({Id:req.body.userId}).then(records=>{
       res.send({records:records}); 
       res.end()
    }).catch(err=>{
        throw err;
    })
    
});

router.delete('/physician',function(req,res){
    User.deleteOne({Id:req.body.Id})
});
//employee form

router.post('/employee',function(req,res){
    const type =req.body.type;
    const blood=req.body.blood;
    const Id=req.body.Id;

    /*User.findOne({Id:req.body.Id}).then(user=>{

    })*/
    console.log(req.body);

    if(req.body.type != '' && req.body.type=='bloodType'){
        if(req.body.blood !=''){
            User.find({blood:blood}).then(records=>{
        
                res.render("employee",{
                    records:records
                })
                console.log(records.Id);
               res.end()
            }).catch(err=>{
                throw err;
            })
        }else{
            console.log('please choose blood type');
        }
    }else if(req.body.type != '' && req.body.type=='Id'){
       if(req.body.Id != ''){
        User.find({Id:req.body.Id}).then(records=>{
        
            res.render("employee",{
                records:records
            })
            console.log(records.Id);
           res.end()
        }).catch(err=>{
            throw err;
        })
       }else{
           console.log('please type valid id');
       }
    }else{
        console.log('please choose type');
    }
   
});

router.post('/student/save',function(req,res){
  
  console.log(req.body);
  User.findOneAndUpdate({Id:req.body.userId,work:"Student"},{
         $push: { savedData:{"date":req.body.dateof,"amount":req.body.amount}} 
         }).then(data=>{
            res.json({'message':'Data Added successfully'});
        }).catch(err=>{
            throw err;
        });
});
router.post('/student',function(req,res){
    
});

//logout form
router.get('/logout',function(req,res){
    if ('loggedIn' in req.session){
        delete req.session.loggedIn
        
    }
    res.redirect('/login');
    req.flash('success','you are logged out');
    
});

//login process
router.post('/login',function(req,res,next){
    /*passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);*/
    User.findOne({Id:req.body.Id}).then(user=>{
        console.log(user);
        if(user !=null){
            var matched=bcrypt.compareSync(req.body.password,user.password);
            console.log(matched)

            if(matched){
                if(req.body.work == "Physician" ){
                    console.log('Ph');
                    User.find({work:'Student'}).then(user_records=>{
                        res.render('physician',{userName:user.name,user_records:user_records}); 
                        res.end()
                    }).catch(err=>{
                        throw err;
                    })

                    
                  }else if(req.body.work == "Employee"){
                      res.render('employee',{userName:user.name});
                  }else if(req.body.work == "Student" ){
                      res.render('student',{userName:user.name,user:user});
                  }else{
                      console.log(req.body.work);
                  }
                  req.session.loggedIn=true;
            }
            else{
                res.render("login",{errors:{msg:"try login again"}})
               
                res.end();
            }
        }
        else{
            res.render("login",{errors:{msg:"try login again"}})
               
            res.end();
        }
        
    }).catch(err=>{throw err})


    


});

//passport process
passport.use(new localStrategy(
    function(Id,password,done){
        User.getUserId(Id,function(err,user){
            if(err) throw err;
            if(!user){
                return done(null,false,{message:'error'});
            }
            User.comparePassword(password,user.password,function(err,isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{message:'invalid password'});
                }
            });
        });
    }));


passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserId(id, function(err, user) {
    done(err, user);
    });
});

//date and time
let now = new Date();

currentDate=date.format(now, 'ddd MMM DD YYYY'); 

module.exports=router;

