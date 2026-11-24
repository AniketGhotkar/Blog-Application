const express = require("express");
const User = require("../model/User");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");

// router.get("/profile", (req, res) => {
//     res.send("User Profile");
// });

// router.get("/", (req,res) => {
//     res.send("All Users");
// });

// router.get("/:id", (req, res) => {
//     res.send(`User ID:${req.params.id}`);
// });

// router.post("/register", (req, res) => {
//     res.send("Registration Successful");
// })

// router.post("/aniket", async (req, res) => {

//     try {

//         if(!req.body.name || !req.body.email){
//             res.status(400).send({message : "Name and email required"});
//         }

//         const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         age: req.body.age
//         });
//     await user.save();
//     res.status(201).json(user);
//     } catch(err) {
//         if (err.code === 11000) {
//             return res.status(400).json({
//             message: "Email already exists"
//             });
//         }

//         res.status(500).send(err.message);
//     }
// });


router.get("/getAllUsers", asyncHandler(async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
}));

// router.get("/:id", async (req, res) => {
//     try {
//         const data = req.params.id;
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//             message: "Invalid user ID"
//             });
//         }
//         const user = await User.findById(data);
//         if (!user) {
//              return res.status(404).json({
//                 message: "User not found"
//              });
//         }
//         res.status(200).json(user);
//     } catch (error){
//         res.status(500).send(error.message);
//     }
// })

// router.put("/:id", async (req, res) => {
//     try {
//         const id = req.params.id;

//         const user = await User.findByIdAndUpdate(id, req.body,   { returnDocument: "after" });

//         if(!user) {
//             return res.status(404).json({
//                 message : "User not found"
//             });
//         }

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         });
//     }
// })

// router.patch("/:id", async (req, res) => {
//     try {
//         const id = req.params.id;

//         const user = await User.findByIdAndUpdate(id, req.body,   { returnDocument: "after" });

//         if(!user) {
//             return res.status(404).json({
//                 message : "User not found"
//             });
//         }

//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({
//             message: err.message
//         });
//     }
// })

// router.delete("/:id", async (req, res) => {
//     try  {
//         const id = req.params.id;
//         if (!mongoose.Types.ObjectId.isValid(id)) {
//             return res.status(400).json({
//             message: "Invalid user ID"
//             });
//         }
//         const user = await User.findByIdAndDelete(id);
//         if (!user) {
//              return res.status(404).json({
//                 message: "User not found"
//              });
//         }

//         res.status(200).json(user);
//     } catch(error) {
//         res.status(500).json({message: error.message});
//     }
// })

router.post("/login",asyncHandler( async (req, res) => {
        const {email , password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET,
                { expiresIn: "1m" }
            );
            res.status(200).json({
                message: "Login successful",
                token,  
            user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                    }
            });
        }else {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }
}));

router.post("/register", asyncHandler(async (req, res) => {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });
}));

module.exports = router;
