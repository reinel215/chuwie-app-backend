const db = require('../../config/firebase/db')

const updateUser = async ({ userId, updateValues = {} }) => {
    const userDb = db.collection("users");
    const userDoc = userDb.doc(userId);
    await userDoc.update(updateValues);
    const userUpdated = await userDoc.get();
    return userUpdated.data();
}



module.exports = updateUser;