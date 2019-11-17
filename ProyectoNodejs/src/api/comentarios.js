const { Publicacion, Comentario, Likes } = require('../models')
import {Login} from "../services"

const ctrl = {}
//comentarios
ctrl.comentarios = async(req, res)=> { 
      try {
        const token = req.headers.authorization.split(' ')[1]
        let usu = await Login.decodeTok(token)
        console.log('Id del token :: '+ usu.sub)
        const publicaciones = await Publicacion.findById(req.params.publicaciones_id);
        const newComment = new Comentario(req.body); 
        newComment.publicacion_id= publicaciones._id;
        newComment.user = usu.sub
        console.log(newComment) 
        console.log('id publi' + publicaciones._id)
        const a = await newComment.save();
        res.json(a)
      } catch (error) {
        console.log('error al comentar')
      }
      
  }
  ctrl.verComentarios = async(req, res)=> {
    try{
      const publicaciones = await Publicacion.findById(req.params.publicaciones_id);
      const comentarios = await Comentario.find({publicacion_id: publicaciones._id}).sort({Create_at:'desc'}).populate('user')
        res.json(comentarios);
      }catch (error) {
      console.log('Error Get comentarios')
      }  
  }
  ctrl.likes = async (req, res)=> {
    const publicaciones = await Publicacion.findById(req.params.publicaciones_id);  
    if(publicaciones){
      publicaciones.likes = publicaciones.likes+1;
      await publicaciones.save();
      res.json(publicaciones)
    }else{
      console.log('Error me gusta')
    }
  }
  /* ctrl.likes = async (req, res)=> {
    const publicaciones = await Publicacion.findById(req.params.publicaciones_id);
        try{
              if(publicaciones){
                const token = req.headers.authorization.split(' ')[1]
                let usu = await Login.decodeTok(token)
               const meGusta = new Likes(req.body)
               meGusta.publicacion_id = publicaciones._id
               meGusta.user = usu.sub
               meGusta.cantLikes = meGusta.cantLikes + 1
              await meGusta.save();
              res.json(meGusta)
              console.log('Le has dado me gusta backend')
              }else{ 
                console.log('no ha public')
              }
     }catch (error) {
      console.log('Error me gusta')
        }  
  }  */
module.exports = ctrl;