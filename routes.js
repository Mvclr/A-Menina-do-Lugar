const express = require("express");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const cookieParser = require("cookie-parser");
const connection = require("./db/db_server.js");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname, "public")));
router.use(cookieParser());



router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "p_AMDL.html"));
});

router.get('/menina', ( req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'p_AMDL.html'));
})

module.exports = router;
