const express = require("express")
const router = express.Router()
const userController = require('../controller/userController')
const varifyauth = require('../middlewares/verifyAuth')

router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)

module.exports= router;