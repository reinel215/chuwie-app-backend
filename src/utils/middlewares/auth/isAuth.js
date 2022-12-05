const admin = require('../../../config/firebase/config');


const isAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
    }

    admin.auth().verifyIdToken(req.headers.authorization)
        .then((decodedToken) => {
            next()
        }).catch(() => {
            res.status(403).json({ error: 'Unathorized' });
        });

}


module.exports = isAuth;