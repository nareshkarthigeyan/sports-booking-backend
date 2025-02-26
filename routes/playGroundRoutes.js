const express = require("express");
const Ground = require("../models/PlayGround");
const {createGround, getAllGrounds} = require("../controllers/groundController");

const router = express.Router();

router.get("/", getAllGrounds)
router.post("/", createGround);

module.exports = router;