const { where } = require("sequelize");
const { User, Token, Sequelize, Order, Product } = require("../models/index");
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const { jwt_secret } = require ('../config/config.json')['development']
const transporter = require("../config/nodemailer");
const { Op} = Sequelize;


const UserController = {
    async register(req, res, next) {
        try {
            if(!req.body.password){
                return res.status(400).send({message:"Rellena tu contraseña"})
            }
            const password = bcrypt.hashSync(req.body.password,10)
            const user = await User.create({...req.body, password:password, confirmed:false, role:"user"});

            const emailToken = jwt.sign({email:req.body.email},jwt_secret,{expiresIn:'48h'})
            const url = 'http://localhost:3001/users/confirm/'+ emailToken
            await transporter.sendMail({
                to: req.body.email,
                subject: "Confirme su registro",
                html: `<h3>Bienvenido, estás a un paso de registrarte </h3>
                <a href="${url}"> Clica para confirmar tu registro</a>
                Este enlace caduca en 48h.
                `,
            });
            res.status(201).send({message:"Usuario creado con exito", user})
        } catch (error) {
            console.error(error);
            next(error)
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
            if(!user.confirmed){
                return res.status(400).send({message:"Falta que confirmes tu correo"})
            }
            const isMatch = bcrypt.compareSync(req.body.password, user.password);
            if(!isMatch){
                return res.status(400).send({message:"Usuario o contraseña incorrectos"})
            }
            let token = jwt.sign({id:user.id}, jwt_secret)
            await Token.create({
                token, UserId: user.id
            });
            res.send({msg:`Bienvenid@ ${user.email}`,user, token})
        } catch (error) {
            console.error(error);
            res.status(500).send({message:"Error de servidor"})
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
            res.status(500).send({message:"Error de servidor"})
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
            res.status(500).send({message:"Error de servidor"})
        }
    },async confirm(req,res){
        try {
        const token = req.params.emailToken
        const payload = jwt.verify(token,jwt_secret)
          await User.update({confirmed:true},{
            where:{
              email: payload.email
            }
          })
          res.status(201).send( "Usuario confirmado con éxito" );
        } catch (error) {
          console.error(error)
        }
      },
    
}

module.exports = UserController