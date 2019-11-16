//controlador de publicacion
const path = require('path');
import {Login} from "../services"
const { Publicacion, Usuario, Comentario} = require('../models');
const md5 = require('md5');
const ctrl = {}

ctrl.index =async(req, res) =>{ 
  const publicaciones = await Publicacion.find({user:req.user.id}).sort({Create_at:'desc'})
  
  res.render(`publicaciones/new-public`,{publicaciones})
}
ctrl.detalPublic  =async(req, res) =>{   
  try{
    const publicaciones = await Publicacion.findById(req.params.publicaciones_id); 
      /* publicaciones.vistas = publicaciones.vistas+1;
      await publicaciones.save();
      const comentarios = await Comentario.find({publicacion_id: publicaciones._id}).sort({Create_at:'desc'});  */
      res.json(publicaciones);
    }catch (error) {
    console.log('Error Get por id')
    }  
};
ctrl.mostrarPublicacion = async(req, res) => { 
  const publicaciones = await Publicacion.find().sort({Create_at:'desc'}).populate('categoria');//ordena publicaciones por orden de fecha
  res.json(publicaciones)
}
ctrl.create = async(req, res)=> { 
  const token = req.headers.authorization.split(' ')[1]
  let usu = await Login.decodeTok(token)
  console.log('Id del token :: '+ usu.sub)
    let user= usu.sub
    console.log(req.file)
    const {titulo, descripcion ,categoria, precio  } = req.body
    let imagen = ""
    if (req.file && req.file.path) {
      imagen = `/upload/${req.file.filename}`
    }
    const q = {titulo, descripcion,categoria,precio, imagen, user }
    try {
      const data = await Publicacion.create(q)
      res.status(201).json(data)
    } catch (error) {
        console.log('error en al guardar metodo Create')
    }
}
ctrl.update = async(req, res) =>{ 
  try{
    const datos  = req.body
    const publicaciones = await Publicacion.findByIdAndUpdate(req.params.publicaciones_id, datos);
  res.json(publicaciones);
  console.log(publicaciones);
  console.log('Exito al editar')
  }catch (error) {
    console.log('error en al actualizar metodo Update')
  }      
}
ctrl.likes = async (req, res)=> {
  const publicaciones = await Publicacion.findOne({imagen:{$regex:req.params.publicaciones_id}});  
  if(publicaciones){
    publicaciones.likes = publicaciones.likes+1;
    await publicaciones.save();
    res.json({likes: publicaciones.likes})
  }else{
    redirect('/')
  }
}
ctrl.delete = async(req, res)=> { 
  try{   
    const publicaciones = await Publicacion.findByIdAndDelete(req.params.publicaciones_id);    
   res.json(publicaciones);
   console.log(publicaciones);
   
  }  catch (error) {
    console.log('Error Get por id')
    }   
    
};
module.exports = ctrl;