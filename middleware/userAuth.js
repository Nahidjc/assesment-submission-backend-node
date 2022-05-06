const jwt = require("jsonwebtoken")

const userAuth = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log(token);
        if (!token) {
            return res.status(400).json({ message: "Invalid Authentication" })
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Authentication" })
            }
            console.log(user);
            req.user = user;
            next();
        })

    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

module.exports = userAuth;