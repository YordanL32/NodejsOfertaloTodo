const express = require(`express`);
const router = express.Router();
/* const modPublicacion = require('../models/Publicacion'); */
const {isAuthenticated} = require('../helpers/auth');
const ctrlPublic= require('../api/publicacion');

router.get(`/publicaciones/add`,isAuthenticated, ctrlPublic.index);
router.get(`/publicaciones/:publicaciones_id`, ctrlPublic.detalPublic ); 
router.post(`/publicaciones`, ctrlPublic.create );
router.post(`/publicaciones/:publicaciones_id/like`, ctrlPublic.likes );
router.post(`/publicaciones/:publicaciones_id/comentarios`, ctrlPublic.comentarios );
router.delete(`/publicaciones/:publicaciones_id`, ctrlPublic.delete );

router.get(`/publicaciones`,ctrlPublic.mostrarPublicacion);


//Registro de  publicaciones
/* router.post(`/publicaciones/new-public`, isAuthenticated, async (req, res) =>{
    const {titulo, descripcion}=req.body;
    const errors = [];
    if(!titulo){
        errors.push({text:'Por favor ingrese  titulo'});

    };
    if(!descripcion){
        errors.push({text:'Por favor una descripcion'});

    };
    if(errors.length>0){
       res.render(`publicaciones/new-public`,{
           errors,
           titulo,
           descripcion
       });
    }else{
      
      const newPublicacion= new  modPublicacion({titulo,descripcion});
      newPublicacion.user = req.user.id;
      await newPublicacion.save()
      req.flash('success_msg', 'Registro Exitoso '+newPublicacion.titulo);
      res.redirect(`/publicaciones`);
        }
}); */
//mustra todas las publicaciones
/* router.get(`/publicaciones`,isAuthenticated, async(req, res) => {
    const publicaciones=await modPublicacion.find().sort({Create_at:'desc'});//ordena publicaciones por orden de fecha
    res.render(`publicaciones/todasPublic`,{publicaciones}); 
}); */
//mis publicaciones solo muestra las del usuario

//mostrar o buscar una publicacion en especifico 
/* router.get(`/publicaciones/edit/:id`, isAuthenticated, async (req, res) => {
    const publicacion = await modPublicacion.findById(req.params.id);//buscar por id
    res.render(`publicaciones/editPublic`,{publicacion}); 
}); */
//actualiza una publicacion
/* router.put(`/publicaciones/editPublic/:id`,isAuthenticated, async (req, res) => {
    const {titulo, descripcion} =req.body;
    await modPublicacion.findByIdAndUpdate(req.params.id, {titulo, descripcion});
    req.flash('success_msg', 'Actualización Exitosa de '+titulo);
    res.redirect('/publicaciones'); 
}); */
//eliminar una publicacion
/* router.delete('/publicaciones/detele/:id' ,isAuthenticated,  async (req, res) => {    
    await modPublicacion.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Eliminación  Exitosa ');
    res.redirect('/publicaciones'); 
}); */

module.exports = router;