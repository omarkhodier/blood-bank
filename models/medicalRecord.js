const mongoose= require('mongoose');


var BloodSchema=mongoose.Schema({
    Id:{
        type:String,

    },
    width:{
        type:String,

    },
    height:{
        type:Number,

    },
    blood:{
        type:String,

    },
    pressure:{
        type:String,

    },
    eye:{
        type:String,

    },
    diabetes:{
        type:String,

    },
    CBC:{
        type:String,

    },
    


});

const Blood=module.exports=mongoose.model('Blood',BloodSchema);    
