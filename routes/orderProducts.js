const express = require("express")
const OrderProductController = require("../controllers/OrderProductController")
const router = express.Router()

router.post("/",OrderProductController.create)

module.exports = router