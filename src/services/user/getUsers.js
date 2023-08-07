const admin = require("../../config/firebase/config");
const db = require("../../config/firebase/db");

const getUsers = async () => {
  const userDb = db.collection("users").where("enabled", "==", true);
  const users = await userDb.get();
  const usersResponse = [];
  users.forEach((user) => {
    usersResponse.push(user.data());
  });

  return usersResponse;
};

module.exports = getUsers;
