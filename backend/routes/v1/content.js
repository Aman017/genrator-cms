const express = require("express");
const {rewrite} = require("../../controller/content")
const router = express.Router()
const {auth} = require('../../middleware/auth')


// todo: handle auth for generate image
router.post('/rewrite', auth, rewrite );

module.exports = router;
