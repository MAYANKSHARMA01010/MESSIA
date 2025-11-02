const { prisma } = require("../config/database");
const { createToken } = require("../utils/auth")
const bcrypt = require("bcrypt");


async function createUserController(req, res) {
    const { name, username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                Name: name,
                Username: username,
                Email: email,
                Password: hashedPassword,
            },
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                name: newUser.Name,
                username: newUser.Username,
                email: newUser.Email,
            },
        });
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            ERROR: "Internal Server Error while creating user",
        });
    }
}


async function loginUserController(req, res) {
    const { email, username, password } = req.body;

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    email ? { Email: email } : undefined,
                    username ? { Username: username } : undefined,
                ].filter(Boolean),
            },
        });

        if (!user) {
            return res.status(404).json({ ERROR: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(401).json({ ERROR: "Invalid credentials" });
        }

        const payload = {
            id: user.id,
            name: user.Name,
            email: user.Email,
            username: user.Username,
        };

        const token = createToken(payload);

        return res.status(200).json({
            message: "Login successful ✅",
            token,
            user: {
                id: user.id,
                name: user.Name,
                email: user.Email,
                username: user.Username,
            },
        });
    } 
    catch (err) {
        console.error("Login Error:", err);
        return res.status(500).json({ ERROR: "Internal Server Error" });
    }
}


async function logoutUserController(req,res) {
    try {
        return res.status(200).json({
            message: "Logout successful",
        });
    } 
    catch (error) {
        console.error("Logout error:", error);
        return res.status(500).json({
            ERROR: "Logout failed",
        });
    }
}


async function getMeController(req,res) {
    try {
        const userId = req.user.id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                Name: true,
                Username: true,
                Email: true,
                Gender: true,
            },
        });

        if (!user) {
            return res.status(404).json({ ERROR: "User not found" });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user,
        });
    } 
    catch (error) {
        console.error("GetMe error:", error);
        return res.status(500).json({
            ERROR: "Internal Server Error",
        });
    }
}


module.exports = { 
    createUserController,
    loginUserController,
    logoutUserController,
    getMeController,
};
