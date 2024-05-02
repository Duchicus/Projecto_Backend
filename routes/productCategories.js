const express = require("express")
const ProductCategoryController = require("../controllers/ProductCategoryController")
const router = express.Router()

router.post("/",ProductCategoryController.create)

module.exports = router