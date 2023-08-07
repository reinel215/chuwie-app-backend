const admin = require("../../config/firebase/config");
const db = require("../../config/firebase/db");

const getUserInfo = async ({ userId }) => {
  const userDb = db.collection("users");
  const userDoc = userDb.doc(userId);
  const userInfo = await userDoc.get();
  return userInfo.data();
};

module.exports = getUserInfo;
