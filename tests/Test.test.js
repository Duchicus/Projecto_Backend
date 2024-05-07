const request = require("supertest");
const app = require("../index.js");
const { User, Product } = require("../models/index.js")
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config/config.json")["development"];

let token;

describe("testing", () => {
  const user = {
    email: "mpiernash@gmail.com",
    password: "123456",
    role: "user",
    confirmed: false,
  };
  const product = {
    name: "pastelitos",
    price: "2",
  };
    test("Create a user", async () => {
    const res = await request(app)
        .post("/users/register")
        .send(user)
        .expect(201)
          expect(res.body.user.id).toBeDefined();
          expect(res.body.user.createdAt).toBeDefined();
          expect(res.body.user.updatedAt).toBeDefined();
    });

    test("Confirm a user", async () => {
      const emailToken = jwt.sign({ email: user.email }, jwt_secret, {
        expiresIn: "48h",
      });
      const res = await request(app)
        .get("/users/confirm/" + emailToken)
        .expect(201);
      expect(res.body.message).toBe("Usuario confirmado con éxito");
    });
    
    test("Login a user", async () => {
        const res = await request(app)
          .post("/users/login")
          .send({ email: "duchicu@gmail.com", password: "123456" })
          .expect(200);
        token = res.body.token;
      });

    test("Create a product", async () => {
      const res = await request(app)
          .post("/products")
          .send(product)
          .expect(201)
          .set({ Authorization: token })
            expect(res.body.product.id).toBeDefined();
            expect(res.body.product.createdAt).toBeDefined();
            expect(res.body.product.updatedAt).toBeDefined();
      });  

    test("Get products", async () => {
      const res = await request(app)
        .get("/products")
        .expect(200)
        .set({ Authorization: token });
        expect(res.body).toBeInstanceOf(Array);
    });

    test("LogOut", async () =>{
      const res = await request(app)
        .delete("/users/logout")
        .expect(200)
        .set({ Authorization: token})
        expect(res.body.message).toBe("Desconectado con éxito")
    })

      afterAll(() => {
        return User.destroy({ where: {role:"user"}});
      });
  });
  
  