const express = require("express")
const ReviewController = require("../controllers/ReviewController")
const router = express.Router()

router.post("/",ReviewController.create)
router.get("/",ReviewController.getAll)
router.put("/id/:id",ReviewController.update)
router.delete("/id/:id",ReviewController.delete)

module.exports = router