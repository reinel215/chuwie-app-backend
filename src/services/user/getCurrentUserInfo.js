const admin = require('../../config/firebase/config');
const db = require('../../config/firebase/db')

const getCurrentUserInfo = async ({ tokenId }) => {
    const decodedToken = await admin.auth().verifyIdToken(tokenId)
    const uid = decodedToken.uid;
    const userDb = db.collection("users");
    const userDoc = userDb.doc(uid);
    const userInfo = await userDoc.get();
    return userInfo.data();
}



module.exports = getCurrentUserInfo;