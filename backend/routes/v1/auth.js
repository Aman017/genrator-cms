const express = require("express");
const {signUp} =require("../../controller/auth")
const router = express.Router()


router.post('/sign-up',signUp);

module.exports = router;
