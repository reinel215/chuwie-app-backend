const admin = require("../../config/firebase/config");

const createUserAuth = async (user) => {
  const userResponse = await admin.auth().createUser({
    email: user.email,
    password: user.password,
    emailVerified: false,
    disabled: false,
  });

  return userResponse;
};

module.exports = createUserAuth;
