const express = require("express")
const ProductController = require("../controllers/ProductController")
const {authentication, isAdmin} = require('../middleware/authentication')
const router = express.Router()

router.post("/",authentication,isAdmin,ProductController.create)
router.delete("/id/:id",authentication,isAdmin,ProductController.delete)
router.put("/id/:id",authentication,isAdmin,ProductController.update)
router.get("/id/:id",ProductController.getById)
router.get("/name/:name",ProductController.getByName)
router.get("/price/:price",ProductController.getByPrice)
router.get("/desc",ProductController.getByDesc)
router.get("/",ProductController.getAll)

module.exports = router