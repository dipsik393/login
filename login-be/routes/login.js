const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

router.post("/", async (req, res) => {
    const { user, pwd } = req.body;

    if (!user || !pwd) return res.status(400).json({ message: "Username and password required" });

    try {
        const foundUser = await User.findOne({ username: user });
        if (!foundUser) return res.status(401).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(pwd, foundUser.password);
        if (!match) return res.status(401).json({ message: "Invalid credentials" });

        res.json({ message: "Login success", accessToken: "dummy-token" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;