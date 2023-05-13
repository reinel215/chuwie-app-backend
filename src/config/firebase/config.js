const admin = require("firebase-admin");
const serviceAccount = require("../../../chuwie-81c03-firebase-adminsdk-4b1kk-6ec4568936.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
