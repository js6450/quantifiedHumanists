require('dotenv').config();

module.exports = {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    PORT: process.env.PORT || 8080,
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID
};