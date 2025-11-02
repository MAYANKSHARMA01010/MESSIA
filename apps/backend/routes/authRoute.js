const express = require("express")

const authRouter = express.Router()

const {
    createUserMiddleware,
    loginUserMiddleware,
    logoutUserMiddleware
} = require("../middlewares/authMiddleware")

const {
    createUserController,
    loginUserController,
    logoutUserController
} = require("../controllers/authController")


authRouter.post("/register",createUserMiddleware,createUserController)
authRouter.post("/login",loginUserMiddleware,loginUserController)
authRouter.post('/logout',logoutUserMiddleware,logoutUserController)

module.exports = { authRouter }
