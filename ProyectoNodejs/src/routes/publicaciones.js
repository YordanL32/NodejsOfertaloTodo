const express = require(`express`)
const router = express.Router()




const ctrlPublic= require('../api/publicacion')
const ctrlComentario= require('../api/comentarios')
router.post(`/`, ctrlPublic.create )
router.get(`/:publicaciones_id`, ctrlPublic.detalPublic ) 
router.put(`/:publicaciones_id`, ctrlPublic.update ) 

router.put(`/:publicaciones_id/like`, ctrlComentario.likes )
router.post(`/:publicaciones_id/comentarios`, ctrlComentario.comentarios )
router.get(`/:publicaciones_id/comentarios`, ctrlComentario.verComentarios ) 
router.delete(`/:publicaciones_id`, ctrlPublic.delete )

router.get(`/`,ctrlPublic.mostrarPublicacion)
module.exports = router
