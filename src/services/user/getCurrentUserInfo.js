const admin = require('../../config/firebase/config');


const getCurrentUserInfo = async ({ tokenId }) => {
    const decodedToken = await admin.auth().verifyIdToken(tokenId)
    const uid = decodedToken.uid;
    const userInfo = await admin.auth().getUser(uid);
    //aqui falta obtener la data de la coleccion
    return userInfo;
}



module.exports = getCurrentUserInfo;