const { Order, Product } = require("../models/index.js");

const OrderController = {
    async create(req, res) {
        try {
            const order = await Order.create(req.body);
            order.addProduct(req.body.ProductId)
            res.status(201).send({message:"Pedido creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"Error de servidor"})
        }
    },async getAll(req,res){
        try {
            const order = await Order.findAll({
                include : [{model: Product, attributes:["name"], through: {attributes : []}}]
            });
            res.send(order)
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"Error de servidor"})
        }
    }
}

module.exports = OrderController
