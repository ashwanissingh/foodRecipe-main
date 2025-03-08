const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectDB = require("./config/connectionDB")
const cors = require("cors")

connectDB()
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const PORT = process.env.PORT || 3000

app.use("/",require("./routes/user"))
app.use("/recipe",require("./routes/recipe"))
// app.use(express.urlencoded({ extended: true }));

app.listen(PORT,(err) => {
    console.log(`app is listening on port ${PORT}`)
})