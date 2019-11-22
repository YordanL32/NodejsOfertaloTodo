const express = require(`express`)
const router = express.Router()




const ctrlCompartir= require('../api/compartir')
const ctrlComentario= require('../api/comentarios')
router.post(`/`, ctrlCompartir.create )
router.get(`/`,ctrlCompartir.mostrarPublicacion)
router.delete(`/:publicaciones_id`, ctrlCompartir.delete )
/* router.get(`/:publicaciones_id`, ctrlCompartir.detalPublic ) 
router.put(`/:publicaciones_id`, ctrlCompartir.update ) 

router.put(`/:publicaciones_id/like`, ctrlComentario.likes )
router.post(`/:publicaciones_id/comentarios`, ctrlComentario.comentarios )
router.get(`/:publicaciones_id/comentarios`, ctrlComentario.verComentarios ) 

 */

module.exports = router
