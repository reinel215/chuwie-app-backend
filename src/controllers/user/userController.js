const router = require('express').Router();
const admin = require('../../config/firebase/config');
const createUserDoc = require('../../services/user/createUserDoc');
const createUserAuth = require('../../services/user/createUserAuth');
const forgotPassword = require('../../services/user/forgotPassword');
const isAuth = require('../../utils/middlewares/auth/isAuth');
const getCurrentUserInfo = require('../../services/user/getCurrentUserInfo');

const usersApi = (app) => {

    app.use('/api/users', router);

    router.post('/register', async (req, res, next) => {

        try {
            const user = {
                email : req.body.email,
                password: req.body.password,
            }
            const userResponse = await createUserAuth(user);
            try {
                await createUserDoc({ email: req.body.email, name: req.body.name, uid: userResponse.uid });
            } catch (error) {
                admin.auth().deleteUser(userResponse.uid);
                next(error);
                return;
            }

            res.status(201).json(userResponse)
        } catch (error) {
            next(error);
        }

    })



    router.post('/forgot-password', async (req,res, next) => {
        try {
            await forgotPassword({ email: req.body.email });
            res.status(200).json({ message: "ok" })
        } catch (error) {
            next(error);
        }

    })


    router.get('/currentUser', isAuth ,async (req,res,next) => {
        try {
            const user = await getCurrentUserInfo({ tokenId: req.headers.authorization });
            res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    })
}

module.exports = {
    usersApi
}