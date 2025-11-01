const express = require("express")

const authRouter = express.Router()
const {
    createUserController
} = require("../controllers/authControllers")
const {
    createUserMiddleware
} = require("../middlewares/authMiddleware")


authRouter.post("/register",createUserMiddleware,createUserController)

module.exports = {
    authRouter
}
 