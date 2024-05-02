const { Order, Product } = require("../models/index.js");

const OrderController = {
    async create(req, res) {
        try {
            await Order.create(req.body);
            res.status(201).send({msg:"Pedido creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async getAll(req,res){
        try {
            const order = await Order.findAll({
                include : [{model: Product, attributes:["name"], through: {attributes : []}}]
            });
            res.send(order)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    }
}

module.exports = OrderController
