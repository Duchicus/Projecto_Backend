const express = require("express")
const CategoryController = require("../controllers/CategoryController")
const router = express.Router()

router.post("/",CategoryController.create)
router.delete("/id/:id",CategoryController.delete)
router.put("/id/:id",CategoryController.update)
router.get("/id/:id",CategoryController.getById)
router.get("/name/:name",CategoryController.getByName)
router.get("/",CategoryController.getAll)
module.exports = router