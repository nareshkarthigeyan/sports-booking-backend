const express = require("express");
const Ground = require("../models/PlayGround");
const {createGround} = require("../controllers/groundController");

const router = express.Router();

router.get("/", async (req, res) => {
    try{s
        const grounds = await Ground.find();
        res.json(grounds);
    } catch {
        res.status(500).json({ error: "Server error" });
    }
})

router.post("/", createGround);
module.exports = router;