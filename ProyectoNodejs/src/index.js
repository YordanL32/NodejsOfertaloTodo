'use strict'
const express = require(`express`);
const path = require(`path`);
const exphbs = require (`express-handlebars`);
const methodOverride = require(`method-override`); 
const session = require(`express-session`);
const multer = require('multer');
const morgan = require('morgan'); // dependencia para subir fotos
<<<<<<< HEAD
const cors = require('cors')
const bodyParser = require('body-parser')

//inicializaciones
=======
const http = require('http');
const debug = require('debug')('notasdb:server')
const chalk = require('chalk')
var sockets = require('./socket')
>>>>>>> 0963b3b1bcb024a9a673ba22ad368691eddb724d
const app = express();
const cors = require('cors')
const port = process.env.PORT || 9004;
const server = http.createServer(app);
import mongoose from 'mongoose'
import { mongoUrl } from './config'
import { Usuario, Login } from './routes'

app.use(cors())
<<<<<<< HEAD
app.set(`port`, process.env.PORT || 3000);
app.set(`views`, path.join(__dirname, `views`));
app.engine(`.hbs`, exphbs({
    defaultLayout:`main`,
    layoutsDir: path.join(app.get(`views`), `layouts`) ,
    partialsDir: path.join(app.get(`views`),  `partials`) ,
    extname: `.hbs`,
    helpers: require('./helpers')

}))


app.set(`view engine`, `.hbs`);

=======
//inicializaciones
>>>>>>> 0963b3b1bcb024a9a673ba22ad368691eddb724d

app.use(express.static('public'));
// Midlewares (antes de pasar a las rutas)
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/upload' ),
    filename: (req, file, cb) =>{ 
        cb(null, file.originalname)
    }
  })
const upload = multer({
    storage,
    dest: path.join(__dirname, 'public/upload' ),
    limits: { fileSize: 5000000  },
     fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/
      const mimetype = filetypes.test(file.mimetype)
      const extname = filetypes.test(path.extname(file.originalname))
      if(mimetype && extname ){
        return cb(null,true)
      }
      cb('Error: el el achivo debe ser una imagen valida')
      console.log('Error: el el achivo debe ser una imagen valida')
    } 
  }).single('imagen')
  app.use(upload);
app.use(express.json()); // para manejar los Likes
app.use(methodOverride(`_method`));
app.use(session({
    secret: `mysecretapp`,
    resave: true,
    saveUninitialized: true

}));



// variables globales


// routes 
app.use('/api/login', Login)
app.use('/api/usuario/', Usuario)

app.use((err, req, res, next) => {
 debug(`Error: ${err.message}`)

  if (err.message.match('/not found/')) {
    return res.status(404).send({ err: err.message })
  }

  res.status(500).send({ error: err.message })
})

function handleFatalError (err) {
  console.error(`${chalk.red(['fatal error'])} ${err.message}`)
  console.error(err.stack)
}

//conectarse a db
sockets.startSocketServer(server)
async function start () {
  const db = await mongoose.connect('mongodb://127.0.0.1:27017/notasdb')
  if (!module.parent) {
    process.on('uncaughtException', handleFatalError)
    process.on('unhandledRejection', handleFatalError)
    
    server.listen(port, '0.0.0.0', () => {
      console.log(`${chalk.green('[notasdb-server]')} server listening on port ${port}`)
    })
  }

}
start()