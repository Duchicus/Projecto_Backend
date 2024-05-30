const express = require("express")
const ProductController = require("../controllers/ProductController")
const {authentication, isAdmin} = require('../middleware/authentication')
const router = express.Router()

const { uploadUserProductsImages } = require('../middleware/multer');


router.post('/',authentication,isAdmin,uploadUserProductsImages.single('image_path'), ProductController.create);
router.delete("/id/:id",authentication,isAdmin,ProductController.delete)
router.put("/id/:id",authentication,isAdmin,ProductController.update)
router.get("/id/:id",authentication,ProductController.getById)
router.get("/name/:name",authentication,ProductController.getByName)
router.get("/price/:price",authentication,ProductController.getByPrice)
router.get("/desc",authentication,ProductController.getByDesc)
router.get("/",ProductController.getAll)


module.exports = router