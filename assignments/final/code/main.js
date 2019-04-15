const express = require('express');
const http = require('http');
const path = require('path');
const logger = require('morgan');

const basicAuth = require('express-basic-auth');
const mongoose = require('mongoose');

const upload = require('./upload');
const singleUpload = upload.single('image');

const config = require('./config');

const Sentiment = require('sentiment');
let sentiment = new Sentiment();

// let result = sentiment.analyze('sad');
// console.log(result);

const app = express();

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});

const Schema = mongoose.Schema;
const InputSchema = new Schema({
   date: String,
   imageURL: String,
   word: String,
   wordScore: Number
});

const emotionalModel = mongoose.model('input', InputSchema);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(logger('dev'));

app.use(express.static(path.resolve(__dirname, 'public')));

const challengeAuth = basicAuth({
    authorizer: simpleAuthenticater,
    challenge: true,
    unauthorizedResponse: getUnauthorizedResponse
});

function simpleAuthenticater(username, password){
    return username == config.USERNAME && password == config.PASSWORD;
}

function getUnauthorizedResponse(req){
    return 'not authorized'
}

app.get('/', challengeAuth, (req, res) =>{
   res.sendFile('index.html');
});

app.get('/api', challengeAuth, (req, res) =>{
    emotionalModel.find({}, (err, doc) =>{
        res.send(doc);
    });
});

app.post('/api', challengeAuth, (req, res) =>{
   // emotionalModel.create(req.body, (err, doc) => {
   //    res.send(doc);
   // });

    singleUpload(req, res, function(err, some){
        //console.dir(req.body.word);
        if(err){
            return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]});
        }
        //
        // let dataInput = {
        //     'date': Date.now(),
        //     'imageURL': req.file.location,
        //     'word': req.body.word,
        //     wordScore: sentiment.analyze(req.body.word).score
        // };
        //
        // emotionalModel.create(dataInput, (err, doc) =>{
        //     res.send(doc);
        // });

        // return res.json(dataInput);

        return req.file.location
    })
});

app.use((req, res) => {
    res.status(404).send("404 - either not authorized or no route");
});

http.createServer(app).listen(config.PORT, () => {
   console.log(`see the magic at http://localhost:${config.PORT}`);
});

