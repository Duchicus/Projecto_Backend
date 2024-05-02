const { review, User } = require("../models/index.js");

const ReviewController = {
    async create(req, res) {
        try {
            await review.create(req.body);
            res.status(201).send({msg:"Producto creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async getAll(req,res){
        try {
            const rev = await review.findAll({
                include : [{model:User,attributes:["email"]}]
            })
            res.send(rev)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    }
}

module.exports = ReviewController