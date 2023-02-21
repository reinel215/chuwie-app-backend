'user strict';

const express = require('express');
const app = express();

//LOGGER
const morgan = require('morgan');


app.use(morgan('dev'));

//COOKIE PARSER
const cookieParser = require('cookie-parser');
app.use(cookieParser());


//BODY PARSER
const bodyParser = require('body-parser');
app.use(bodyParser.json()) //parse aplicattion json
app.use(bodyParser.urlencoded({ extended: false }))





//CORS
const cors = require('cors');
app.use(cors({})); //activa el cors para todas las rutas


//PROTECCION DE CABEZERAS
const helmet = require('helmet');
app.use(helmet());


//CARPETA PUBLICA
const path = require('path');
app.use('/public', express.static(path.join(__dirname, 'public')));



//COMPRESION DE CONSULTAS
const compression = require('compression');
app.use(compression());




//RUTAS
const { usersApi } = require('./controllers/user/userController');
usersApi(app);



//Errores
//page not found
const { notFound } = require('./utils/middlewares/errors/notFound');
app.use(notFound);
//log errores
const { logErrors } = require('./utils/middlewares/errors/logErrors');
app.use(logErrors);
//error handler 
const { errorHandler } = require('./utils/middlewares/errors/errorHandler');
app.use(errorHandler);


//Desplegar Servidor
const { runServer } = require('./utils/runner');
runServer(app);