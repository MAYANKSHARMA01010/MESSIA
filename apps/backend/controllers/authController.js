const { prisma } = require("../config/database");
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

module.exports = { createUserController };
