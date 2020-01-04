const express = require(`express`)
const router = express.Router()




const ctrlPublic= require('../api/publicacion')
const ctrlComentario= require('../api/comentarios')
router.post(`/`, ctrlPublic.create )
router.get(`/`,ctrlPublic.mostrarPublicacion)
/* router.get(`/:publicaciones_id`, ctrlPublic.detalPublic )  */
router.put(`/:publicaciones_id`, ctrlPublic.update ) 
router.delete(`/:publicaciones_id`, ctrlPublic.delete )
/* ...........Comentarios.................. */
router.post(`/:publicaciones_id/comentarios`, ctrlComentario.comentarios )
router.get(`/:publicaciones_id/comentarios`, ctrlComentario.verComentarios )
/* ...........Me gusta.................. */
router.post(`/:publicaciones_id/like`, ctrlComentario.likes )
router.get(`/:publicaciones_id/like`, ctrlComentario.verlikes)

module.exports = router
