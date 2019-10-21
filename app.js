const express = require('express');
const path = require('path');
const http= require('http')
const bodyParser=require('body-parser');
const mongoose= require('mongoose');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport=require('passport');
var exphbs = require('express-handlebars');
const config =require('./config/database');
const localStrategy=require('passport-local').Strategy;
const cookieParser=require('cookie-parser');
const date = require('date-and-time');
const Sequelize = require('sequelize');
const mysql=require('mysql');
const mongo=require('mongodb');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

let app=express();
let db=mongoose.connection;
//mysql connection
var connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'users'
});

connection.connect(function(err){
    if(!!err){
        console.log('error');
    }else
    {
        console.log('connected');
    }
});
//check connection

db.once('open',function(){
    console.log('connected to mongodb for try');
});
//check for db err
db.on('error',function(err){
    console.log(err);
});

//bodyparser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','pug');

// express session 
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }));

//passport init
app.use(passport.initialize());
app.use(passport.session());

// connect flash 
app.use(flash());

//express message
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// app validator
app.use(expressValidator({
    errorFormatter:function(param,msg,value){
        var namespace =param.split('.')
        , root=namespace.shift()
        , formparam= root;
        while(namespace.length){
            formparam += '['+namespace.shift()+']';
        }
        return{
            param :formparam,
            msg :msg,
            value :value
        };
    }
}));

//global vars
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
});

//database connect
mongoose.Promise=global.Promise;
mongoose.connect(config.database);

//bring models
var User= require('./models/user');
var Blood=require('./models/user');

//passport config
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());


//middleware
app.get('*',function(req,res,next){
    res.locals.user=req.user || null;
    next();
});

//home route
app.get('/',function(req,res){
    res.render('home');
});
//sign up route
app.get('/signup',function(req,res){
    res.render('signup');
});
//login route
app.get('/login',function(req,res){
    res.render('login');
});

//student 
app.get('/users/student',function(req,res){
    res.render('student');
});

//employee
app.get('/users/employee',function(req,res){
    res.render('employee');
});
//doctor
app.get('/users/physician',function(req,res){
    res.render('physician');
});

//route file

let user=require('./routes/users');
app.use('/users',user);


//start server
app.listen(3000,function(){
    console.log('server started on port 3000');
});

