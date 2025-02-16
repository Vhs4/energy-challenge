const express = require("express")
const cors = require("cors")
const supplierRoutes = require("./routes/supplierRoutes")

const app = express()

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())

app.use("/api/suppliers", supplierRoutes)

module.exports = app

