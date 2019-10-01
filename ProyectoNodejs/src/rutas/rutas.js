//rutas de la aplicacion para abrir las vistas
const express = require('express');
const router = express.Router(); 
const modUsuario = require('../modelos/modUsuario'); /* importamos los modelos */
  
router.get('/', async (req, res)=>{
    const usuarios = await modUsuario.find();
    console.log(usuarios);
    res.render('principal', {usuarios});
            });
//agregar un usuario
router.post('/registro',async (req,res)=>{ 
  
  const usuario= new modUsuario(req.body);
  await usuario.save();
  res.redirect('/');
     
});
//eliminar un usuario fisicamente
router.get('/eliminar/:id', async (req,res)=>{ 
  const {id} = req.params;
  await modUsuario.remove({_id: id});
  res.redirect('/');
     
});
//cambia el estatus del usuario
router.get('/borrar/:id', async (req,res)=>{ 
  const {id} = req.params;
  const usuario = await modUsuario.findById(id);
  usuario.status = !usuario.status;
  await usuario.save();
  res.redirect('/');
     
});
//actualiza el usuario
router.get('/editar/:id', async (req,res)=>{ 
  const {id} = req.params;
  const usuario = await modUsuario.findById(id);
    
  res.render('editarUsuario',{usuario} );
     
});
router.post('/editar/:id', async (req,res)=>{ 
  const {id} = req.params;
  await  modUsuario.update({_id:id}, req.body);    
  res.redirect('/');     
});
module.exports= router