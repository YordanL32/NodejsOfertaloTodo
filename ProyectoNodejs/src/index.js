const express = require(`express`);
const path = require(`path`);
const exphbs = require (`express-handlebars`);
const methodOverride = require(`method-override`); 
const session = require(`express-session`);
const flash = require ('connect-flash');// para mensajes
const passport = require(`passport`);
const multer = require('multer');
const morgan = require('morgan'); // dependencia para subir fotos



//inicializaciones
const app = express();
require(`./database`);
require(`./config/passport`)

//configuraciones 
app.set(`port`, process.env.PORT || 3000);
app.set(`views`, path.join(__dirname, `views`));
app.engine(`.hbs`, exphbs({
    defaultLayout:`main`,
    layoutsDir: path.join(app.get(`views`), `layouts`) ,
    partialsDir: path.join(app.get(`views`),  `partials`) ,
    extname: `.hbs`,
    helpers: require('./helpers')

}));
app.set(`view engine`, `.hbs`);


// Midlewares (antes de pasar a las rutas)
app.use(morgan('dev'))
app.use(multer({dest: path.join(__dirname, './public/upload/temp' )}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json()); // para manejar los Likes
app.use(methodOverride(`_method`));
app.use(session({
    secret: `mysecretapp`,
    resave: true,
    saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 


// variables globales
app.use((req, res, next) => {
 res.locals.success_msg = req.flash(`success_msg`);
 res.locals.error_msg = req.flash(`error_msg`);
 res.locals.error = req.flash(`error`); //mensajes errores del login
 res.locals.user = req.user || null; //mensajes errores del login
 next();
});

// routes 
app.use(require(`./routes/index`));
app.use(require(`./routes/publicaciones`));
app.use(require(`./routes/users`));



//archivos estaticos
app.use(express.static(path.join(__dirname, `/public`)));


//servidor esta escuchando 
app.listen(app.get(`port`), () =>{
console.log(`Iniciando servidor en el puerto: `, app.get(`port`));
});