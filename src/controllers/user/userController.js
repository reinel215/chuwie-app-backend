const router = require("express").Router();
const admin = require("../../config/firebase/config");
const createUserDoc = require("../../services/user/createUserDoc");
const createUserAuth = require("../../services/user/createUserAuth");
const forgotPassword = require("../../services/user/forgotPassword");
const isAuth = require("../../utils/middlewares/auth/isAuth");
const getUserInfo = require("../../services/user/getUserInfo");
const updateUser = require("../../services/user/updateUser");
const deleteUser = require("../../services/user/deleteUser");
const rolFilter = require("../../utils/middlewares/rolFilter");
const getUsers = require("../../services/user/getUsers");

const usersApi = (app) => {
  app.use("/api/users", router);

  router.post("/register", async (req, res, next) => {
    try {
      const user = {
        //register in the auth of firebase
        email: req.body.email,
        password: req.body.password,
      };

      const userResponse = await createUserAuth(user);

      const userRegister = {
        //register in the collection of user informatcion
        uid: userResponse.uid,
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        country: req.body.country,
        docNumber: req.body.docNumber,
        role: req.body.role,
        enabled: true,
      };
      try {
        await createUserDoc(userRegister);
      } catch (error) {
        admin.auth().deleteUser(userResponse.uid);
        next(error);
        return;
      }

      res.status(201).json(userResponse);
    } catch (error) {
      let errorResponse = {
        message: "Error en registar usuario",
        status: 400,
      };
      if (error.code === "auth/email-already-exists") {
        errorResponse.message = "El email indicado ya se encuentra en uso.";
      }
      next(errorResponse);
    }
  });

  router.post("/register-user-doc", isAuth, async (req, res, next) => {
    try {
      const userRegister = {
        //register in the collection of user informatcion
        uid: req.userId,
        email: req.body.email,
        name: req.body.name,
        lastname: req.body.lastname,
        country: req.body.country,
        docNumber: req.body.docNumber,
        role: req.body.role,
        enabled: req.body.enabled || true,
      };
      await createUserDoc(userRegister);
      res.status(201).json(userResponse);
    } catch (error) {
      next(error);
    }
  });

  router.post("/forgot-password", async (req, res, next) => {
    try {
      await forgotPassword({ email: req.body.email });
      res.status(200).json({ message: "ok" });
    } catch (error) {
      next(error);
    }
  });

  router.get("/currentUser", isAuth, async (req, res, next) => {
    try {
      const user = await getUserInfo({ userId: req.userId });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  router.put("/", isAuth, async (req, res, next) => {
    try {
      const user = await updateUser({
        userId: req.userId,
        updateValues: req.body,
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  });

  router.delete(
    "/:id",
    isAuth,
    rolFilter({ allowedRoles: ["super_admin"] }),
    async (req, res, next) => {
      const userId = req.params.id;
      console.log("ESTE ES EL USERID ", userId);
      try {
        await deleteUser({ userId });
        res.status(200).json();
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/",
    isAuth,
    rolFilter({ allowedRoles: ["super_admin"] }),
    async (req, res, next) => {
      try {
        const users = await getUsers();
        res.status(200).json(users);
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    "/:userId",
    isAuth,
    rolFilter({ allowedRoles: ["super_admin"] }),
    async (req, res, next) => {
      try {
        const userId = req.params.userId;
        console.log("EN GET ", userId);
        const user = await getUserInfo({ userId });
        res.status(200).json(user);
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = {
  usersApi,
};
