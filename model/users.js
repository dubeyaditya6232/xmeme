const mongoose=require('mongoose');
const schema=mongoose.Schema;

const userSchema=new schema({
    name:{
        type:String,
        //required:true
    },
    email:{
        type:String,
        //required:true
    },
    password:{
        type: String,
        //required:true
    }
});

module.exports = new mongoose.model('user', userSchema);