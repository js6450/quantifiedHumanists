const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

const config = require('./config');

aws.config.update({
    secretAccessKey: config.SECRET_ACCESS_KEY,
    accessKeyId: config.ACCESS_KEY_ID,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'emotional-photos',
        acl: 'public-read',
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb){
            cb(null, Date.now().toString())
        }
    })
});

module.exports = upload;
