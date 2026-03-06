const express = require("express")
const authRouter = require('./auth.js')
const router = express.Router()
const imageRouter = require('./image.js')


router.use("/auth", authRouter);
router.use("/image", imageRouter);

module.exports = router;
