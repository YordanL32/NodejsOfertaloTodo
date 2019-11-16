const express = require(`express`)
const router = express.Router()
import {Login} from "../services"

const { Publicacion, Comentario} = require('../models');
/* const modPublicacion = require('../models/Publicacion') */
const path = require('path')
const ctrlPublic= require('../api/publicacion')
const ctrlComentario= require('../api/comentarios')
/* router.post(`/publicaciones`, ctrlPublic.create ) */

router.post(`/`, ctrlPublic.create )

/* router.get(`/publicaciones/add`, ctrlPublic.index) */
router.get(`/:publicaciones_id`, ctrlPublic.detalPublic ) 
router.put(`/:publicaciones_id`, ctrlPublic.update ) 

router.put(`/:publicaciones_id/like`, ctrlComentario.likes )
router.post(`/:publicaciones_id/comentarios`, ctrlComentario.comentarios )
router.get(`/:publicaciones_id/comentarios`, ctrlComentario.verComentarios ) 
router.delete(`/:publicaciones_id`, ctrlPublic.delete )

router.get(`/`,ctrlPublic.mostrarPublicacion)
module.exports = router
