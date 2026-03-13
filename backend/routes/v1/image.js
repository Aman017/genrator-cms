const express = require("express");
const { generateImage } = require('../../controller/image')
const router = express.Router()
const {auth} = require('../../middleware/auth')


// todo: handle auth for generate image
router.post('/generate', generateImage );

module.exports = router;
