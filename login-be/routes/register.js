const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) {
        return res.status(400).json({ message: "Username and password required" });
    }

    try {
        // check if user exists
        const duplicate = await User.findOne({ username: user });
        if (duplicate) return res.sendStatus(409);

        // hash password
        const hashedPwd = await bcrypt.hash(pwd, 10);

        // save user
        await User.create({
            username: user,
            password: hashedPwd
        });

        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;