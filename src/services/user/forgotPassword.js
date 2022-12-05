const admin = require('../../config/firebase/config');
const { sendEmail } = require('../../lib/mail/nodemail');


const forgotPassword = async ({ email }) => {
    const user = await admin.auth().getUserByEmail(email);
    await sendEmail({
        to: user.email,
        subject: "Recover Password",
        text: `You can access with this password: 123456`
    })

}



module.exports = forgotPassword;