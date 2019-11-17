const express = require(`express`);
const router = express.Router();
const ctrlCategoria= require('../api/categoria');
import {Auth} from '../middleware';

router.get(`/:id`, ctrlCategoria.findById);
router.get(`/`, ctrlCategoria.find);
router.post(`/`,  Auth.isUsuario, ctrlCategoria.create );
router.put(`/:id`, Auth.isUsuario, ctrlCategoria.update );
router.delete(`/:id`,  Auth.isUsuario, ctrlCategoria.delete );

module.exports = router;