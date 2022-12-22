
const express = require("express")
const connectDB = require("./db")
require("dotenv").config()

const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()
connectDB()
const port = 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})