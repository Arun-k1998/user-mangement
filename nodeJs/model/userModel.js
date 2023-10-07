const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    is_admin:{
        type:Boolean,
        default:false
    }
})

const userData = mongoose.model('User',userSchema)

module.exports =  userData