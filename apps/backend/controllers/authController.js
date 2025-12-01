const { prisma } = require("../config/database");
const { createToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

/* REGISTER */
async function createUserController(req, res) {
    try {
        let { name, username, email, password } = req.body;

        if (!name || !username || !email || !password)
            return res.status(400).json({
                ERROR: "All fields are required",
            });

        name = name.trim();
        username = username.trim().toLowerCase();
        email = email.trim().toLowerCase();

        const exists = await prisma.user.findFirst({
            where: { OR: [{ email }, { username }] },
        });

        if (exists)
            return res.status(400).json({
                ERROR: "Username or Email already exists",
            });

        const hash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                username,
                email,
                password: hash,
            },
        });

        return res.status(201).json({
            message: "✅ Registered",
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("REGISTER ERROR:", err);
        res.status(500).json({ ERROR: "Register failed" });
    }
}

/* LOGIN */
async function loginUserController(req, res) {
    try {
        let { email, username, password } = req.body;

        if (!password || (!email && !username))
            return res.status(400).json({
                ERROR: "Email/Username and password required",
            });

        if (email) email = email.trim().toLowerCase();
        if (username) username = username.trim().toLowerCase();

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    email ? { email } : undefined,
                    username ? { username } : undefined,
                ].filter(Boolean),
            },
        });

        if (!user)
            return res.status(404).json({
                ERROR: "User not found",
            });

        const ok = await bcrypt.compare(password, user.password);
        if (!ok)
            return res.status(401).json({
                ERROR: "Invalid credentials",
            });

        // ✅ MUST CONTAIN ID
        const token = createToken({
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
        });

        return res.json({
            message: "✅ Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                gender: user.gender,
                role: user.role,
            },
        });
    } catch (err) {
        console.error("LOGIN ERROR:", err);
        res.status(500).json({ ERROR: "Login failed" });
    }
}

/* LOGOUT */
async function logoutUserController(req, res) {
    return res.json({
        message: "✅ Logout successful",
    });
}

/* GET ME */
async function getMeController(req, res) {
    try {
        if (!req.user?.id)
            return res.status(401).json({
                ERROR: "Invalid token payload",
            });

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                gender: true,
                role: true,
                createdAt: true,
            },
        });

        if (!user)
            return res.status(404).json({
                ERROR: "User not found",
            });

        res.json({
            message: "✅ User fetched",
            user,
        });
    } catch (err) {
        console.error("GETME ERROR:", err);
        res.status(500).json({ ERROR: "GetMe failed" });
    }
}

/* UPDATE PROFILE */
async function updateUserController(req, res) {
    try {
        if (!req.user?.id)
            return res.status(401).json({
                ERROR: "Unauthorized",
            });

        let { name, username, gender } = req.body;
        const data = {};

        if (name?.trim()) data.name = name.trim();
        if (username?.trim())
            data.username = username.trim().toLowerCase();
        if (gender?.trim()) data.gender = gender.trim();

        if (!Object.keys(data).length)
            return res.status(400).json({
                ERROR: "Nothing to update",
            });

        if (data.username) {
            const taken = await prisma.user.findFirst({
                where: {
                    username: data.username,
                    NOT: { id: req.user.id },
                },
            });

            if (taken)
                return res.status(400).json({
                    ERROR: "Username already taken",
                });
        }

        const user = await prisma.user.update({
            where: { id: req.user.id },
            data,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                gender: true,
                updatedAt: true,
            },
        });

        return res.json({
            message: "✅ Profile updated",
            user,
        });
    } catch (err) {
        console.error("UPDATE ERROR:", err);
        res.status(500).json({ ERROR: "Update failed" });
    }
}

module.exports = {
    createUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    updateUserController,
};
