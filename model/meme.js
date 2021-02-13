require('dotenv').config();
const { NotExtended } = require('http-errors');
const mongoose=require('mongoose');
const schema=mongoose.Schema;
const autoIncrement=require('mongoose-auto-increment');

mongoose.set('useCreateIndex', true);

var connection = mongoose.createConnection(`mongodb+srv://adi2308:${process.env.DBpass}@cluster0.tfgae.mongodb.net/Xmeme?retryWrites=true&w=majority`);
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