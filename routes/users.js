const express = require("express")
const UserController = require("../controllers/UserController")
const {authentication, isAdmin} = require('../middleware/authentication')
const router = express.Router()

router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.delete('/logout',authentication,UserController.logout)
router.get('/',authentication,isAdmin,UserController.getAll)
router.get('/user',authentication,isAdmin, UserController.getContent)
router.get('/confirm/:emailToken',UserController.confirm)

module.exports = router