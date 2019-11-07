const express = require(`express`);
const router = express.Router();
const ctrlCategoria= require('../api/categoria');

router.get(`/:id`, ctrlCategoria.findById);
router.get(`/`, ctrlCategoria.find);
router.post(`/`, ctrlCategoria.create );
router.put(`/:id`, ctrlCategoria.update );
router.delete(`/:id`, ctrlCategoria.delete );

module.exports = router;