const express = require(`express`);
const router = express.Router();
const ctrlCategoria= require('../api/categoria');

router.get(`/categorias/:id`, ctrlCategoria.findById);
router.get(`/categorias`, ctrlCategoria.find);
router.post(`/categorias`, ctrlCategoria.create );
router.put(`/categorias/:id`, ctrlCategoria.update );
router.delete(`/categorias/:id`, ctrlCategoria.delete );

module.exports = router;