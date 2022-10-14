require('dotenv').config();
const { NotExtended } = require('http-errors');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const autoIncrement=require('mongoose-auto-increment');

mongoose.set('useCreateIndex', true);

var connection = mongoose.createConnection("mongodb://127.0.0.1/xmeme");
autoIncrement.initialize(connection);
const memeSchema=new schema({
    name:{
        type:String,
        //required:true
    },
    caption:{
        type:String,
        //required:true
    },
    url:{
        type: String,
        //required:true
    }
});
memeSchema.plugin(autoIncrement.plugin,'meme');
module.exports = new mongoose.model('meme', memeSchema);