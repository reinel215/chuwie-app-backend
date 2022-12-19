const db = require('../../config/firebase/db')


const createUserDoc = async (user) => {

    const userDb = db.collection("users");
    const userDoc = userDb.doc(user.uid);
    await userDoc.set(user);
}



module.exports = createUserDoc;