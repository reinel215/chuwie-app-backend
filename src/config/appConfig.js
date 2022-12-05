require('dotenv').config();



const config = {
    dev : process.env.NODE_ENV,
    port : process.env.PORT || 3000,
    token : process.env.SECRET_TOKEN,
    gmail: {
        user: process.env.GMAIL_USER,
        password: process.env.GMAIL_PASS
    }
}



module.exports = { config };