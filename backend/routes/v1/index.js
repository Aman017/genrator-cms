const express = require("express")
const authRouter = require('./auth.js')
const router = express.Router()
const imageRouter = require('./image.js')
const contentRouter = require('./content.js')


router.use("/auth", authRouter);
router.use("/image", imageRouter);
router.use("/content", contentRouter);

module.exports = router;
