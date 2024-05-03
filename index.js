const express = require("express")
const app = express()
const PORT= 3001
const { typeError } = require('./middleware/errors')

app.use(express.json())

app.use("/products",require("./routes/products"))
app.use("/categories",require("./routes/categories"))
app.use("/users",require("./routes/users"))
app.use("/orders",require("./routes/orders"))
app.use("/productCategories",require("./routes/productCategories"))
app.use("/orderProducts",require("./routes/orderProducts"))
app.use("/reviews",require("./routes/reviews"))

app.use(typeError)

app.listen(PORT,()=> console.log(`Server started on port ${PORT}`))