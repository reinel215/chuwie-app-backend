'use strict';

const errorHandler = (err, req, res, next) => {

    //voy a verificar las cabezeras
    if (res.headersSent) {
        return next(err);
    }


    let status;
    err.message == 'page not found' ? status = 404 : status = 400;



    res.status(status ? status : err.status).json(
        {
            error: err.message
        }
    );
}


module.exports = { errorHandler };