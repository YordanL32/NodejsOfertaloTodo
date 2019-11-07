const express = require(`express`)
const router = express.Router()

const { Publicacion, Comentario} = require('../models');
/* const modPublicacion = require('../models/Publicacion') */
const path = require('path')
/* app.use(multer({dest: path.join(__dirname, './public/upload/temp' )}).single('image')); */
const ctrlPublic= require('../api/publicacion')

 
/* router.post(`/publicaciones`, ctrlPublic.create ) */

router.post(`/`, async (req, res) => {
    console.log(req.file)
    const {titulo, descripcion , precio } = req.body
    let imagen = ""
    if (req.file && req.file.path) {
      imagen = `/upload/${req.file.filename}`
    }
    const q = {titulo, descripcion,precio, imagen }
    try {
      const data = await Publicacion.create(q)
      res.status(201).json(data)
    } catch (error) {
        console.log('error en al guardar metodo Create')
    }
  })

/* router.get(`/publicaciones/add`, ctrlPublic.index) */
router.get(`/:publicaciones_id`, ctrlPublic.detalPublic ) 

router.post(`/:publicaciones_id/like`, ctrlPublic.likes )
router.post(`/:publicaciones_id/comentarios`, ctrlPublic.comentarios )
router.delete(`/:publicaciones_id`, ctrlPublic.delete )

router.get(`/`,ctrlPublic.mostrarPublicacion)

module.exports = router
