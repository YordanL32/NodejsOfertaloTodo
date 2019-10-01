/* Este es el .js principal el raiz de la aplicacion */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

/* const modPublicacion = require('./modelos/modPublicacion'); */
const app = express();
const router = express.Router(); //para usar las rutas 

const rutas = require('./rutas/rutas');  
app.use(express.urlencoded({extended: false}));//entiende los datos que envia un formulario
app.use(bodyparser.json());
app.use(methodOverride()); /* responde a las solicitudes PUT y DELETE */

app.use(bodyparser.json({limit: '50mb' })); /* limite de cantidad de transferencia de datos */

mongoose.connect('mongodb://localhost:27017/ofertaloTodoDB')
.then(db=>console.log('Base de datos conectada'))
.catch(err=>console.log(err));  /* conexion con BD */
    
    

//configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname , 'vistas'));// config para leer todas las vistas
app.set('view engine','ejs' );
//middlewares
app.use(morgan('dev')); //muestra datos por consola
//rutas
app.use('/',rutas);
//iniciando el servidor
app.listen(app.get('port'), ()=> {  
  console.log(`iniciando el servidor en el puerto ...${app.get('port')}`);    
});



/* rutas.rutas(); */

/* --------------metodos API REST----------------------------
--------------metodos de usuarios------------------------- */

//obtener los  usuarios
/* router.get('/usuarios', (req,res)=>{  req parametros de entrada y res parametros de salida 
    modUsuario.find({}, (error,respuesta)=>{     
        if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
        res.send({estado:{codigo:0, respuesta:'Busqueda de todos los usuarios  exitosa'}, usuarios: respuesta}); 
      });
}); */
//obtener un usario por id
/* router.get('/usuarios/:id', (req,res)=>{ 
        modUsuario.findById(req.params.id, (error,retorno)=>{     
          if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
          res.send({estado:{codigo:0, respuesta:'Busqueda  exitosa'}, usuario: retorno}); 
        });
       
}); */
//guardar un usuario
/* router.post('/registro/', (req,res)=>{ 
  
    var objetiAdd = new modUsuario();
    if(req.body.nombre!=null) objetiAdd.nombre = req.body.nombre;
    if(req.body.apellido!=null) objetiAdd.apellido = req.body.apellido;
    if(req.body.edad!=null) objetiAdd.edad = req.body.edad;

    objetiAdd.save((error, respuesta)=>{
      if (error) res.send({estado:{codigo:0, respuesta:"error al guardar"}});
      res.send({estado:{codigo:0, respuesta:'Guardado con exito'}, usuarios: respuesta}); 
    });
    
}); */

//actualizar un usuario
/* router.put('/usuarios/:id', (req,res)=>{ 
    modUsuario.findById(req.params.id, (error,retorno)=>{
      if(!modUsuario){
        res.statusCode=404;
        return res.send({error: "No Encontrado"});
      }
    if(req.body.nombre!=null) retorno.nombre = req.body.nombre;
    if(req.body.apellido!=null) retorno.apellido = req.body.apellido;
    if(req.body.edad!=null) retorno.edad = req.body.edad;

    retorno.save((error, respuesta)=>{
      if (error) res.send({estado:{codigo:0, respuesta:"Error al actualizar el usuario"}});
      res.send({estado:{codigo:0, respuesta:'Actualizacion exitosa'}, usuarios: respuesta}); 
    });
    });
    
}); */
//eliminar un usuario
/* router.delete('/usuarios/:id', (req,res)=>{ 
    modUsuario.findById(req.params.id, (error,retorno)=>{
           
        retorno.remove((error, respuesta)=>{
          if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
          res.send({estado:{codigo:0, respuesta:'Eliminacion exitosa'}, usuarios: respuesta}); 
        });
        });
});
 */
/* --------------------metodos de las publicacion-------------------------- */
/* 
router.get('/publicaciones', (req,res)=>{
    modPublicacion.find({}).populate('idUsuario').exec((error,respuesta) => {     
        if (error) res.send({estado:{codigo:0, respuesta:error.mensaje} });
        res.send({estado:{codigo:0, respuesta:'Busqueda de todas las publicaciones exitosa'}, publicaciones: respuesta}); 
      });
}); */

//guardar una publicacion
/* router.post('/publicaciones/', (req,res)=>{ 
    var objPublicacion = new modPublicacion();
    objPublicacion.titulo = req.body.titulo;
    objPublicacion.texto = req.body.texto;
    objPublicacion.imagen = req.body.imagen;
    objPublicacion.idUsuario = req.body.idUsuario;

    objPublicacion.save((error, respuesta)=>{
      if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
      res.send({estado:{codigo:0, respuesta:'publicado con exito'}, usuarios: respuesta}); 
    });
    
}); */
app.use(router) /* use el manejador de rutas definido */