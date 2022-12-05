const db = require('../../config/firebase/db')


const createUserDoc = async (user) => {

    const userDb = db.collection("users");
    const userDoc = userDb.doc(user.uid);
    await userDoc.set({
        email: user.email,
        name: user.name
    });
}



module.exports = createUserDoc;