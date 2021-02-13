var express = require('express');
var router = express.Router();
var memes = require('../model/meme') 

var d = [];
router.get('/', (req, res, next) => {  //handles the page when /memes endpoint is called
    memes.find({}).sort({ _id: -1 }).limit(100).exec((err, data) => { //sorting the data in descending order with limit of 100 data
        if (err) {
            console.log(err);
        }
        else {
            res.statusCode=200;
            res.render('memes', { data: data, size: data.length }); //render memes page with the memes stored in data variable
        }
    })
});
router.post('/', (req, res, next) => {  // handles the post request upon the endpoint /memes
    const { name, caption, url } = req.body;
    const newMemes = new memes({ //creating new meme
        name,
        caption,
        url
    });
    memes.findOne(req.body) //checking for duplicates
    .then((data)=>{
        if(data!==null)
        {// duplicate meme exists
            err=new Error('This Meme Already Exists!, Try new '); // creating an error.
            err.status=409;
            return next(err); 
        }
        else{
            newMemes.save((err, data) => { // saving the newly created meme in database 
                if (err) {
                    console.log(err);
                } else {
                    res.statusCode=200;
                    res.redirect('/memes');
                }
            });
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
});
router.get('/:memeId', (req, res, next) => { // handles the get request on /meme/<id> endpoint
    memes.findById(req.params.memeId) // finding meme by the ID passses in parameters
        .then((data) => {
            if(data!==null)
            { // meme exists           
                d.length = 0; // empty the array d
                d.push(data); // adding the meme in array d  
                res.statusCode=200;             
                res.render('display', { data: d, size: 1 }); // passing the array to frontend
            }
            else{
                err=new Error(' Not Found'); // creating an error.
                err.status=404;
                return next(err);
            } 
        },(err)=>next(err))
        .catch((err)=>next(err));
});
router.patch('/:memeId',(req,res,next)=>{ //handles the PATCH request on the endpoint /memes/<id>
    const { caption , url }=req.body;
    memes.findByIdAndUpdate(req.params.memeId,{$set:{caption,url}},(err,updatedData)=>{ // find the meme by its unique ID and updates it
        if(err){
            console.log(err); // displays any error in console that might have crept while updating
        }
        else{
            res.statusCode=200; 
            res.redirect('/memes');
        }
    });
});
module.exports = router;