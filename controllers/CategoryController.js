const {Category, Product} = require('../models/index')

const CategoryController = {
    async create(req, res) {
        try {
            await Category.create(req.body);
            res.status(201).send({msg:"Categoria creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async update(req, res) {
        try {
            await Category.update(req.body, {
                    where: {
                        id: req.params.id
                    }
            });
            res.send("Categoria actualizada con exito")
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async delete(req, res) {
        try {
            await Category.destroy({
                    where: {
                        id: req.params.id
                    }
            })
            await product_category.destroy({
                where: {
                    CategoryId: req.params.id
                }
            })
            res.send("Categoria eliminada con exito")
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async getById(req,res){
        try {
            const category = await Category.findByPk(req.params.id);
            res.send(category)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async getByName(req,res){
        try {
            const category = await Category.findOne({
                    where: {
                        name: req.params.name
                    }
            });
            res.send(category)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async getAll(req,res){
        try {
            const category = await Category.findAll({
                include : [{model:Product, attributes:["name"], through: { attributes: [] } }]
            })
            res.send(category)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    }
}

module.exports = CategoryController