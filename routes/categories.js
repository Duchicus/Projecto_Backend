const express = require("express")
const CategoryController = require("../controllers/CategoryController")
const {authentication, isAdmin} = require('../middleware/authentication')
const router = express.Router()

router.post("/",authentication,isAdmin,CategoryController.create)
router.delete("/id/:id",authentication,isAdmin,CategoryController.delete)
router.put("/id/:id",authentication,isAdmin,CategoryController.update)
router.get("/id/:id",CategoryController.getById)
router.get("/name/:name",CategoryController.getByName)
router.get("/",CategoryController.getAll)
module.exports = router