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

const color = require('splashy');
const got = require('got');

const app = express();

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});

const Schema = mongoose.Schema;
const InputSchema = new Schema({
   date: String,
   imageURL: String,
   colors: String,
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

app.post('/image-upload', challengeAuth, function(req, res){

   console.log(req.query.word);

    singleUpload(req, res, function(err, some){

        if(err){
            return res.status(422).send({error: [{title: 'Image Upload Error', detail: err.message}]});
        }

        let lastUploadURL = req.file.location;

        (async () => {
            const url = lastUploadURL;
            const { body } = await got(url, { encoding: null });
            const palette = await color(body);

            console.log(palette);

            let inputWords = req.query.word.replace(/-/g, " ");

            let dataInput = {
                'date': Date.now(),
                'imageURL': lastUploadURL,
                'colors': JSON.stringify(palette),
                'word': inputWords,
                wordScore: sentiment.analyze(inputWords).score
            };

            emotionalModel.create(dataInput, (err, doc) =>{
                //console.log("success");
               res.send(doc);
            });

        })();

       // return res.json(lastUploadURL);
    })
});

app.use((req, res) => {
    res.status(404).send("404 - either not authorized or no route");
});

http.createServer(app).listen(config.PORT, () => {
   console.log(`see the magic at http://localhost:${config.PORT}`);
});

