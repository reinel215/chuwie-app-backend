const nodeMailer = require('nodemailer');
const { config } = require('../../config/appConfig');

const sendEmail = ({ to, subject, text }) => {

    const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'gmail',
        auth: {
            user: config.gmail.user,
            pass: config.gmail.password
        }
    });
    const mailOptions = {
        from: config.gmail.user, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        //html: '<b>NodeJS Email Tutorial</b>' // html body
    };


    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            }
            resolve(info);
        });
    });
    

}





module.exports = {
    sendEmail
}