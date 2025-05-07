const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }  ,

    tasks:[

        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'task'
        }

    ]

    
});   

module.exports=mongoose.model('user' , userSchema);