const express = require('express');
const app = express();
const multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://smart-traffic-signal.firebaseapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware   
    next();
});

let Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "images");
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});

let upload = multer({
    storage: Storage
}).single('dataImage');
fs = require('fs');
app.get('/',function(req,res){
    res.status(200).json({status:'All majama from backend side yass!'});
})

app.post('/upload',function(req,res){
    upload(req, res, function(err) {
        if(err) throw err;
        else {
            res.status(200).json({status:"ok",path:req.file.path});
        }
    });
})

app.use("/images", express.static(__dirname + '/images'));


app.listen(process.env.PORT || 5000,function(){
    console.log(`All good, yay!`);
});