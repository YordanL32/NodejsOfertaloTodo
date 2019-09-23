/* Este es el .js principal el raiz de la aplicacion */
const express = require('express');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const modUsuario = require('./modelos/modUsuario'); /* importamos los modelos */
const modPublicacion = require('./modelos/modPublicacion');
const app = express();
const router = express.Router(); /* para usar las rutas */
const config = require('./config')

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
app.use(methodOverride()); /* responde a las solicitudes PUT y DELETE */

app.use(bodyparser.json({limit: '50mb' })); /* limite de cantidad de transferencia de datos */

mongoose.connect(config.baseDatos, (error, res)=>{ /* conexion con BD */
    if(error) throw error;
    console.log('conexion exitosa');
});


app.listen(config.puerto,()=> {
    console.log("Hola mundo");
    console.log("Hola mundo yordan Lopez");
  
});
app.get('/', function(req, res){
    res.sendFile(__dirname + '/vistas/principal.html');
})
app.get('/registro', function(req, res){
    res.sendFile(__dirname + '/vistas/registro.html');
})



/* --------------metodos API REST----------------------------
--------------metodos de usuarios------------------------- */

//obtener los  usuarios
router.get('/usuarios', (req,res)=>{ /* req parametros de entrada y res parametros de salida */
    modUsuario.find({}, (error,respuesta)=>{     
        if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
        res.send({estado:{codigo:0, respuesta:'Busqueda de todos los usuarios  exitosa'}, usuarios: respuesta}); 
      });
});
//obtener un usario por id
router.get('/usuarios/:id', (req,res)=>{ 
        modUsuario.findById(req.params.id, (error,retorno)=>{     
          if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
          res.send({estado:{codigo:0, respuesta:'Busqueda  exitosa'}, usuario: retorno}); 
        });
       
});
//guardar un usuario
router.post('/registro/', (req,res)=>{ 
    console.log('famoso hola mundo');
    var objetiAdd = new modUsuario();
    objetiAdd.nombre = req.body.nombre;
    objetiAdd.apellido = req.body.apellido;
    objetiAdd.edad = req.body.edad;

    objetiAdd.save((error, respuesta)=>{
      if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
      res.send({estado:{codigo:0, respuesta:'Guardado con exito'}, usuarios: respuesta}); 
    });
    
});

//actualizar un usuario
router.put('/usuarios/:id', (req,res)=>{ 
    modUsuario.findById(req.params.id, (error,retorno)=>{
    retorno.nombre = req.body.nombre;
    retorno.apellido = req.body.apellido;
    retorno.edad = req.body.edad;

    retorno.save((error, respuesta)=>{
      if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
      res.send({estado:{codigo:0, respuesta:'Actualizacion exitosa'}, usuarios: respuesta}); 
    });
    });
    
});
//eleiminar un usuario
router.delete('/usuarios/:id', (req,res)=>{ 
    modUsuario.findById(req.params.id, (error,retorno)=>{
           
        retorno.remove((error, respuesta)=>{
          if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
          res.send({estado:{codigo:0, respuesta:'Eliminacion exitosa'}, usuarios: respuesta}); 
        });
        });
});

/* --------------------metodos de las publicacion-------------------------- */

router.get('/publicaciones', (req,res)=>{ /* req parametros de entrada y res parametros de salida */
    modPublicacion.find({}).populate('idUsuario').exec((error,respuesta) => {     
        if (error) res.send({estado:{codigo:0, respuesta:error.mensaje} });
        res.send({estado:{codigo:0, respuesta:'Busqueda de todas las publicaciones exitosa'}, publicaciones: respuesta}); 
      });
});

//guardar una publicacion
router.post('/publicaciones/', (req,res)=>{ 
    var objPublicacion = new modPublicacion();
    objPublicacion.titulo = req.body.titulo;
    objPublicacion.texto = req.body.texto;
    objPublicacion.imagen = req.body.imagen;
    objPublicacion.idUsuario = req.body.idUsuario;

    objPublicacion.save((error, respuesta)=>{
      if (error) res.send({estado:{codigo:0, respuesta:error.mensaje}});
      res.send({estado:{codigo:0, respuesta:'publicado con exito'}, usuarios: respuesta}); 
    });
    
});
app.use(router) /* use el manejador de rutas definido */