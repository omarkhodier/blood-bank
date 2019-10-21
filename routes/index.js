var express=require('express');
var router=express.Router();

//get home page
router.get('/views',function(req,res){
    res.render('home');
});

module.exports=router;