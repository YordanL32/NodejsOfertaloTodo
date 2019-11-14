'use strict'
const express = require(`express`);
const path = require(`path`);
const exphbs = require (`express-handlebars`);
const methodOverride = require(`method-override`); 
const session = require(`express-session`);
const multer = require('multer');
const morgan = require('morgan'); // dependencia para subir fotos


//inicializaciones

const http = require('http');
const debug = require('debug')('notasdb:server')
const chalk = require('chalk')
var sockets = require('./socket')

const bodyParser = require('body-parser')

const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000;
const server = http.createServer(app);
import mongoose from 'mongoose'
import { mongoUrl } from './config'
import { Usuario, Login,Categoria,Publicacion, Perfil } from './routes'


//inicializaciones
//archuvis estaticos
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
// Midlewares (antes de pasar a las rutas)
app.use(morgan('dev'))
app.use(bodyParser.json({limit: '50mb'}))
app.use(express.urlencoded({extended: true}));


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
app.use('/api/categoria/', Categoria)
app.use('/api/publicaciones/', Publicacion)
app.use('/api/perfil/', Perfil)
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
  const db = await mongoose.connect('mongodb://127.0.0.1:27017/ofetalodb')
  if (!module.parent) {
    process.on('uncaughtException', handleFatalError)
    process.on('unhandledRejection', handleFatalError)
    
    server.listen(port, '0.0.0.0', () => {
      console.log(`${chalk.green('[ofetalodb-server]')} Escuchando por el puerto: ${port}`)
    })
  }

}
start()