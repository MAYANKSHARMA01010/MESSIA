const express = require("express");
const authRouter = express.Router();
const rateLimit = require("express-rate-limit");
const {
    createUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    updateUserController,
} = require("../controllers/authController");
const {
    createUserMiddleware,
    loginUserMiddleware,
    logoutUserMiddleware,
    updateUserMiddleware,
} = require("../middlewares/authMiddleware");
const { authenticate } = require("../utils/auth");

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs for auth routes
});

authRouter.post("/register", createUserMiddleware, createUserController);
authRouter.post("/login", loginUserMiddleware, loginUserController);
authRouter.post("/logout", logoutUserMiddleware, logoutUserController);
authRouter.get("/me", authLimiter, authenticate, getMeController);
authRouter.put("/update", authLimiter, authenticate, updateUserMiddleware, updateUserController);

module.exports = authRouter;
