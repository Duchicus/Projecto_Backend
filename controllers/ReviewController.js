const { Review, User } = require("../models/index.js");

const ReviewController = {
    async create(req, res) {
        try {
            await Review.create(req.body);
            res.status(201).send({msg:"Producto creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async getAll(req,res){
        try {
            const rev = await Review.findAll({
                include : [{model:User,attributes:["email"]}]
            })
            res.send(rev)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async update(req, res) {
        try {
            await Review.update(req.body, {
                    where: {
                        id: req.params.id
                    }
            });
            res.send("Review actualizada con exito")
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async delete(req, res) {
        try {
            await Review.destroy({
                    where: {
                        id: req.params.id
                    }
            });
            res.send("Review eliminada con exito")
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    }
}

module.exports = ReviewController