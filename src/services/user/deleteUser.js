const admin = require("../../config/firebase/config");
const db = require("../../config/firebase/db");

const deleteUser = async ({ userId }) => {
  await admin.auth().deleteUser(userId);
  const userDb = db.collection("users");
  const userDoc = userDb.doc(userId);
  await userDoc.delete();
};

module.exports = deleteUser;
