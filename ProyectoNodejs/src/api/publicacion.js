//controlador de publicacion
const path = require('path');
const fs = require('fs-extra');
const {randomNumber }= require('../helpers/libs');
const { Publicacion,user, Comentario} = require('../models');
const md5 = require('md5');
const ctrl = {}

ctrl.index =async(req, res) =>{ 
  const publicaciones = await Publicacion.find({user:req.user.id}).sort({Create_at:'desc'});
  
  res.render(`publicaciones/new-public`,{publicaciones});
};
ctrl.detalPublic  =async(req, res) =>{ 
  const publicaciones = await Publicacion.findOne({imagen:{$regex:req.params.publicaciones_id}}); 
  if(publicaciones){
      publicaciones.vistas = publicaciones.vistas+1;
      await publicaciones.save();
      const comentarios = await Comentario.find({publicacion_id: publicaciones._id}).sort({Create_at:'desc'}); 
      res.render(`publicaciones/detPublic`,{publicaciones, comentarios});
  }else{
    res.redirect('/');
  }
  
};
ctrl.mostrarPublicacion= async(req, res) => {
  const publicaciones = await Publicacion.find({user:req.user.id}).sort({Create_at:'desc'});//ordena publicaciones por orden de fecha
  res.render(`publicaciones/todasPublic`,{publicaciones});
}

ctrl.create = (req, res)=> {   
    const savePublicacion = async () => {
        const urlImg = randomNumber();
        const publicaciones = await Publicacion.find({ filename: urlImg });
        if (publicaciones.length > 0) {
          savePublicacion();
     }else{
         //localizacion de la imagen
         console.log(urlImg);
    const imageTempPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase(); //obtiene el nombre de extencion de la foto ejem png
    const  targetPath = path.resolve(`src/public/upload/${urlImg}${ext}`);
    // validacion de la imagen
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        // you wil need the public/temp path or this will throw an error
        await fs.rename(imageTempPath, targetPath);
        const newImg = new Publicacion({
          titulo: req.body.titulo,
          imagen: urlImg + ext,
          descripcion: req.body.descripcion,
          precio: req.body.precio
           
        });
        newImg.user = req.user.id;
        console.log(newImg);
        console.log(urlImg);
       
        const imageSaved = await newImg.save();
         res.redirect('/publicaciones'  );
       
      } else {
        await fs.unlink(imageTempPath);
        res.status(500).json({ error: 'Solo estan permitidas imagenes' });
      }
    }    
  };
    savePublicacion();
};
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
  const publicaciones = await Publicacion.findOne({imagen:{$regex:req.params.publicaciones_id}});
  if(publicaciones){
    await fs.unlink(path.resolve('./src/public/upload/' + publicaciones.imagen));
    await Comentario.deleteOne({publicacion_id: publicaciones._id});
    await publicaciones.remove();
    res.redirect('/publicaciones');
  }
    console.log(req.params.publicaciones_id);
};
module.exports = ctrl;