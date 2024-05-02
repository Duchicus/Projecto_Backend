const { order_product } = require("../models/index.js");

const OrderProductController = {
    async create(req, res) {
        try {
            await order_product.create(req.body);
            res.status(201).send({msg:"Order_Product creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    }
}

module.exports = OrderProductController
