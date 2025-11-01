const express = require("express")
require('dotenv').config()

const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())

app.get("/",(req,res) => {
    res.status(200).send(`<H1>Backend Running Succesfully</H1>`)
})

app.listen(PORT,() => {
    console.log(`Local Backend Server Start at ${process.env.BACKEND_LOCAL_URL}`)
    console.log(`Server Backend Server Start at ${process.env.BACKEND_SERVER_URL}`)
})
