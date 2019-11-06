//controlador de publicacion
const path = require('path');
const fs = require('fs-extra');
const {randomNumber }= require('../helpers/libs');
const { Publicacion, Comentario} = require('../models');
const md5 = require('md5');
const ctrl = {}

ctrl.index =async(req, res) =>{ 
  const publicaciones = await Publicacion.find({user:req.user.id}).sort({Create_at:'desc'});
  
  res.render(`publicaciones/new-public`,{publicaciones});
};
/* {imagen:{$regex:req.params.publicaciones_id}} */
ctrl.detalPublic  =async(req, res) =>{   
  try{
    const publicaciones = await Publicacion.findOne(req.params.id); 
      /* publicaciones.vistas = publicaciones.vistas+1;
      await publicaciones.save();
      const comentarios = await Comentario.find({publicacion_id: publicaciones._id}).sort({Create_at:'desc'});  */
      res.json(publicaciones);
    }catch (error) {
    console.log('Error Get por id')
    }  
};
ctrl.mostrarPublicacion= async(req, res) => {
  /* {user:req.user.id} */
  const publicaciones = await Publicacion.find().sort({Create_at:'desc'});//ordena publicaciones por orden de fecha
  res.json(publicaciones)
  /* res.render(`publicaciones/todasPublic`,{publicaciones}); */
}

ctrl.create = async(req, res)=> { 
   try {
      const newPublicacion = new Publicacion(req.body)
     await newPublicacion.save()
     res.json(newPublicacion)
    } catch (error) {
      console.log('error en al guardar metodo Create')
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
};
//comentarios
ctrl.comentarios = async(req, res)=> {
  const publicaciones = await Publicacion.findOne({imagen:{$regex:req.params.publicaciones_id}});  
  if(publicaciones){
      const newComment = new Comentario(req.body);
      newComment.gravatar= md5(newComment.email);
      newComment.publicacion_id= publicaciones._id;
      console.log(newComment) 
      await newComment.save();
      res.redirect('/publicaciones/'+publicaciones.uniqueId);

    }else{
      res.redirect('/');
    }
  
  
  
  
};
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