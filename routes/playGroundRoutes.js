const express = require("express");
const Ground = require("../models/PlayGround");

const router = express.Router();

router.get("/", async (req, res) => {
    try{
        const grounds = await Ground.find();
        res.json(grounds);
    } catch {
        res.status(500).json({ error: "Server error" });
    }
})
module.exports = router;