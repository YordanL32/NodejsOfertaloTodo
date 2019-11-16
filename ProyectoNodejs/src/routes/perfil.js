const express = require(`express`);
const router = express.Router();
const ctrlPerfil= require('../api/perfil');

router.get(`/:id`, ctrlPerfil.findById);
router.get(`/`, ctrlPerfil.find);
router.post(`/`, ctrlPerfil.create );
router.put(`/:id`, ctrlPerfil.update );
router.delete(`/:id`, ctrlPerfil.delete );

module.exports = router;