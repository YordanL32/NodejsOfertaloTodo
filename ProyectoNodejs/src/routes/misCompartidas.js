const express = require(`express`)
const router = express.Router()

const ctrlCompartir= require('../api/compartir')

router.get(`/`,ctrlCompartir.misCompartidas)


module.exports = router
