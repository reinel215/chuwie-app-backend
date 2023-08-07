const admin = require("../../../config/firebase/config");

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: "No credentials sent!" });
  }

  const token = req.headers.authorization;
  console.log("TOKEN ESTE ES EL TOKEN");
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.userId = decodedToken.uid;
      next();
    })
    .catch(() => {
      res.status(403).json({ error: "Unathorized" });
    });
};

module.exports = isAuth;
