const express = require("express")
const ProductController = require("../controllers/ProductController")
const {authentication, isAdmin} = require('../middleware/authentication')
const router = express.Router()

const { uploadUserProductsImages } = require('../middleware/multer');


router.post("/",authentication,isAdmin,ProductController.create)
router.delete("/id/:id",authentication,isAdmin,ProductController.delete)
router.put("/id/:id",authentication,isAdmin,ProductController.update)
router.get("/id/:id",ProductController.getById)
router.get("/name/:name",ProductController.getByName)
router.get("/price/:price",ProductController.getByPrice)
router.get("/desc",ProductController.getByDesc)
router.get("/",ProductController.getAll)

router.post('/image',authentication,isAdmin,uploadUserProductsImages.single('imageProduct'), ProductController.create);

module.exports = router