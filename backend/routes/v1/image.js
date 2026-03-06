const express = require("express");
const { generateImage } = require('../../controller/image')
const router = express.Router()
const {auth} = require('../../middleware/auth')


router.post('/generate',auth, generateImage );

module.exports = router;
