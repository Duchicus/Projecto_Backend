const { product_category } = require("../models/index.js");

const ProductCategoryController = {
    async create(req, res) {
        try {
            await product_category.create(req.body);
            res.status(201).send({msg:"Product_Category creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    }
}

module.exports = ProductCategoryController
