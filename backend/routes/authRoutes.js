const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Protected Route",
        user: req.user
    });

});

module.exports = router;