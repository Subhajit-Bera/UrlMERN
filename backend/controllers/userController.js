const User = require("../model/user");
const generateToken =require("../utils/generateToken");
const bcrypt = require("bcryptjs"); 

//User Register
exports.userRegister = (async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            // req.flash("error", "Email already registed!");
            res.status(409).json("Email already registed!");
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            message: "User Registered Successfully",
            data: user,
        });

    } catch (err) {
        console.log(err);
        // req.flash("error", "Couldn't Register");
        res.status(500).json("Sorry, registration unsuccessful.");
    }
})

//User Login:
exports.userLogin= async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user in db by email only
        const userFound = await User.findOne({ email });

        // userFound?.password  -> This is called optional chaning, it simply means -> userFound && userFound.password
        if (userFound && (await bcrypt.compare(password, userFound?.password))) {
            res.json({
                message:"User logged in successfully",
                userFound,
                token: generateToken(userFound?._id), // Generating token
            });
        } else {
            throw new Error("Invalid login credentials");
        }
    } catch (error) {
        console.error(error);
        res.status(401).json("Invalid login credentials");
    }
};
