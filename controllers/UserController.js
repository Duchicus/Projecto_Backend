const { where } = require("sequelize");
const { User, Token, Sequelize, Order, Product } = require("../models/index");
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const { jwt_secret } = require ('../config/config.json')['development']
const { Op} = Sequelize;


const UserController = {
    async register(req, res) {
        try {
            const password = bcrypt.hashSync(req.body.password,10)
            await User.create({...req.body, password:password});
            res.status(201).send({msg:"Usuario creado con exito"})
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async login(req, res) {
        try {
            const user = await User.findOne({
                where : {
                    email:req.body.email
                }
            });
            if(!user){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            let token = jwt.sign({id:user.id}, jwt_secret)
            await Token.create({
                token, UserId: user.id
            });
            res.send(`Bienvenid@ ${user.email}`,user, token)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async logout(req, res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
        }
    },async getAll(req,res){
        try {
            const user = await User.findAll({
                include : {model: Order,attributes:["id"]}
            });
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    },async getContent(req,res){
        try {
            const user = await User.findOne({
                where: {
                    id: req.user.id
                },
                include : [{model: Order,attributes:["id"], include : [{model: Product, attributes:["name"],through : {attributes: []}}]}]
            })
            res.send(user)
        } catch (error) {
            console.error(error);
            res.status(500).send({msg:"Error de servidor"})
        }
    }
}

module.exports = UserController