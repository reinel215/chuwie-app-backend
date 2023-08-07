const getCurrentUserInfo = require("../../services/user/getUserInfo");

const rolFilter = ({ allowedRoles = [] }) => {
  return async (req, res, next) => {
    if (!req.userId) {
      res.status(403).json({ error: "Incomplete data" });
      return;
    }
    const user = await getCurrentUserInfo({ userId: req.userId });

    if (allowedRoles.some((role) => role === user.role)) {
      next();
    } else {
      res.status(403).json({ error: "Unathorized" });
    }
  };
};

module.exports = rolFilter;
