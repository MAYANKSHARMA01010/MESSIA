const { prisma } = require("../config/database");

async function createUserMiddleware(req, res, next) {
    let { name, username, email, password, confirm_password } = req.body;

    if (!name || !password || !confirm_password || !email || !username) {
        return res.status(400).json({
            ERROR: "All fields are required",
        });
    }

    email = email.toLowerCase();
    username = username.toLowerCase();

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }],
            },
        });

        if (existingUser) {
            return res.status(400).json({
                ERROR: "Email or Username already exists",
            });
        }

        req.body.email = email;
        req.body.username = username;
        next();
    } 
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Database not able to respond",
        });
    }
}

module.exports = { 
    createUserMiddleware 
};
