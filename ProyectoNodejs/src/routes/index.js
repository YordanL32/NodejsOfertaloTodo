const express = require(`express`);
const router = express.Router();
const ctrlHome = require('../api/home');



router.get(`/`, ctrlHome.index );


router.get(`/about`, ctrlHome.about );
module.exports = router;