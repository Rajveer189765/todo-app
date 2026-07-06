// const User = require("../models/User");

// const registerUser = async (req, res) => {

//     const { username, email, password } = req.body;

//     // Step 1: Validation
//     if (!username || !email || !password) {
//         return res.status(400).json({
//             success: false,
//             message: "Please fill all fields"
//         });
//     }

//     // Step 2: Check existing user
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//         return res.status(400).json({
//             success: false,
//             message: "User already exists"
//         });
//     }

//     // Step 3: Create user
//     const user = new User({
//         username,
//         email,
//         password
//     });

//     // Step 4: Save
//     await user.save();
//     console.log("User Saved Successfully");
//     console.log(user);

//     // Step 5: Send response
//     res.status(201).json({
//         success: true,
//         user
//     });
// };

// module.exports = {
//     registerUser
// };

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        console.log("User Saved Successfully");

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// const loginUser = async (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Login API Working"
//     });
// };

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill all fields"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({
        success: true,
        token
    });

};

module.exports = {
    registerUser,
    loginUser
};