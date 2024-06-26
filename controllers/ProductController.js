const { Product, Category, product_category, review, Sequelize } = require("../models/index.js");
const path = require('path');

const ProductController = {
    async create(req, res, next) {
        try {
            if (req.file) req.body.image_path = req.file.filename;
            const product = await Product.create(req.body);
            product.addCategory(req.body.CategoryId)
            res.status(201).send({ message: "Producto creado con exito" , product})
        } catch (error) {
            console.error(error);
            next(error)
        }
    },
    async update(req, res) {
        try {
            await Product.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            const product = await Product.findByPk(req.params.id)
            product.setCategories(req.body.CategoryId)
            res.send("Producto actualizado con exito")
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor" })
        }
    }, async delete(req, res) {
        try {
            await Product.destroy({
                where: {
                    id: req.params.id
                }
            });
            await product_category.destroy({
                where: {
                    ProductId: req.params.id
                }
            })
            res.send("Producto eliminado con exito")
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor" })
        }
    }, async getById(req, res) {
        try {
            const product = await Product.findByPk(req.params.id, {
                include: [
                    { model: Category, attributes: ["name"], through: { attributes: [] } },
                    { model: review, attributes: ["Text", "UserId", "ProductId"] }],
            });
            res.send(product)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor" })
        }
    }, async getByName(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    name: req.params.name
                }
            });
            res.send(product)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor" })
        }
    }, async getByPrice(req, res) {
        try {
            const product = await Product.findOne({
                where: {
                    price: req.params.price
                }
            });
            res.send(product)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor" })
        }
    }, async getByDesc(req, res) {
        try {
            const product = await Product.findAll({
                order: [
                    ['price', 'DESC']
                ]
            });
            res.send(product)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor" })
        }
    }, async getAll(req, res) {
        try {
            const product = await Product.findAll({
                include: [
                    { model: Category, attributes: ["name"], through: { attributes: [] } },
                    { model: review, attributes: ["Text", "UserId", "ProductId"] }],
            });
            res.send(product)
        } catch (error) {
            console.error(error);
            res.status(500).send({ message: "Error de servidor", error })
        }
    }, async serveProductImage(req, res) {
        try {
            const imageName = req.params.imageName;
            const imagePath = path.join(__dirname, "../product_images", imageName
            );
            res.sendFile(imagePath);
        } catch (error) {
            res.status(500).send({ message: "Error serving product image", error });
        }
    },
}       

module.exports = ProductController
