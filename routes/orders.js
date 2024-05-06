const express = require("express")
const OrderController = require("../controllers/OrderController")
const {authentication, isAdmin} = require('../middleware/authentication')
const router = express.Router()

router.post("/",authentication,isAdmin,OrderController.create)
router.get("/",OrderController.getAll)

module.exports = router