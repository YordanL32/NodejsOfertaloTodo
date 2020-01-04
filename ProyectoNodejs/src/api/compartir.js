//controlador de compartir publicacion
const path = require('path');
import {Login} from "../services"
const { Publicacion,Compartir, Usuario, Comentario} = require('../models');
const md5 = require('md5');
const ctrl = {}


ctrl.detalPublic  =async(req, res) =>{   
  try{
    const publicaciones = await Publicacion.findById(req.params.publicaciones_id);
      res.json(publicaciones);
    }catch (error) {
    console.log('Error Get por id')
    }  
};
ctrl.mostrarPublicacion = async(req, res) => { 
  const compartir = await Compartir.find().sort({Create_at:'desc'}).populate('categoria user');//ordena publicaciones por orden de fecha
  res.json(compartir)
}
ctrl.misCompartidas = async(req, res) => { 
    const token = req.headers.authorization.split(' ')[1]
    let usu = await Login.decodeTok(token)
    let usuario = usu.sub
    const compartir = await Compartir.find({user:usuario}).sort({Create_at:'desc'}).populate('categoria user');//ordena publicaciones por orden de fecha
    res.json(compartir)
  }
ctrl.create = async(req, res)=> { 
  const token = req.headers.authorization.split(' ')[1]
  let usu = await Login.decodeTok(token)
  console.log('Id del token :: '+ usu.sub)
    let user= usu.sub
    console.log(req.file)
    const {titulo,titulo2, descripcion ,delUsuario,categoria, precio,imagen  } = req.body
    const q = {titulo,titulo2, descripcion,delUsuario,categoria,precio, imagen, user }
    try {
      const data = await Compartir.create(q)
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
ctrl.delete = async(req, res)=> { 
  try{
    const compartir = await Compartir.findByIdAndDelete(req.params.publicaciones_id);
   res.json(compartir);
   console.log(compartir);
   
  }  catch (error) {
    console.log('Error delete por id')
    }   
    
};
module.exports = ctrl;