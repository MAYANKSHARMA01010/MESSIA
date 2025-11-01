const express = require("express")
require('dotenv').config()

const app = express()
const PORT = process.env.SERVER_PORT

app.use(express.json())

app.get("/",(req,res) => {
    res.status(200).send(`<H1>Backend Running Succesfully</H1>`)
})

app.listen(PORT,() => {
    console.log(`Server Start at http://localhost:${PORT}`)
})
