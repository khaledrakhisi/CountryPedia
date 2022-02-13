const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/users-controller");

const router = express.Router();

router.post("/", [check("email").not().isEmpty(),], userController.userLogin);

module.exports = router;
