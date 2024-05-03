const express = require("express")
const cors = require('cors')
const path = require('path');
const app = express()
const PORT = 3001
const { typeError } = require('./middleware/errors')
app.use(express.json())
app.use(cors())

app.use('/product_images', express.static(path.join(__dirname, 'product_images')));
app.use('/product_images', express.static('/product_images'));


app.use("/products", require("./routes/products"))
app.use("/categories", require("./routes/categories"))
app.use("/users", require("./routes/users"))
app.use("/orders", require("./routes/orders"))
app.use("/reviews", require("./routes/reviews"))

app.use(typeError)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))