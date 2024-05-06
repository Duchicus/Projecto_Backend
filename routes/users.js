const express = require("express")
const UserController = require("../controllers/UserController")
const {authentication} = require('../middleware/authentication')
const router = express.Router()

router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.delete('/logout',authentication,UserController.logout)
router.get('/',UserController.getAll)
router.get('/user',authentication, UserController.getContent)
router.get('/confirm/:emailToken',UserController.confirm)

module.exports = router