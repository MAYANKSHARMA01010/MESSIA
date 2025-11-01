const express = require("express")

const authRouter = express.Router()

const {
    createUserMiddleware,
    loginUserMiddleware
} = require("../middlewares/authMiddleware")

const {
    createUserController,
    loginUserController
} = require("../controllers/authController")


authRouter.post("/register",createUserMiddleware,createUserController)
authRouter.post("/login",loginUserMiddleware,loginUserController)


module.exports = {
    authRouter
}
