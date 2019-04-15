require('dotenv').config();

module.exports = {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URL || 'mongodb://localhost:27017/emotional-paintings',
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID
}