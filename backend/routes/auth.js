const express = require("express");
const router = express.Router();
const User = require("../models/User"); // getting user schema
const {body,ExpressValidator,validationResult} = require("express-validator"); // express-validator check for if the valid data is coming to the data base or not in the schema,if the user is not giving wrong information in email or name or password we can make a check for it.
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken'); 
const fetchuser=require('../middleware/fetchuser'); 

const JWT_SECRET="$ukhdeepi$agoodboy"

// ROUTE 1 : create a  user using POST "/api/auth/createuser". Login not required.
router.post("/createuser",[ //array to implement the check for the wrong information using express validator
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5}),
  ],
   async (req, res) => {
    const errors = validationResult(req); // store errors in an array format
    if (!errors.isEmpty()) { // if no errors then return error array
      return res.status(400).json({ errors: errors.array() });
    }
    // checks if the user with the same email id exists
    try {

    let user= await User.findOne({email:req.body.email});
    if(user){
        res.status(400).json({error:"Sorry the user with same email already exists"})
    }

    const salt = await bcrypt.genSalt(10); // generating a salt part i.e "password" + salt(a sequnce of characters to add with password so it cannot be easily cracked by the hacker using rainbow table).
    const secPass= await bcrypt.hash(req.body.password,salt); // hashing the password with the salt to create a hashed password which cannot be easily decrypted.

    user= await User.create({ // to get values from the body 
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })

    const data={ // signing auth token with id as id is the fastest way to retrieve the data from the data base
        user:{
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET); // signing the data with string(any) and generete a token for the user
    res.json({authtoken});
     

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }
  }
);

// ROUTE 2 : Authenticate a user using  POST "/api/auth/login". Login not required.
router.post("/login",[ //array to implement the check for the wrong information using express validator
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be empty").exists(),
  ],
   async (req, res) => {
    const errors = validationResult(req); // store errors in an array format
    if (!errors.isEmpty()) { // if no errors then return error array
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
        if(!user){
           return res.status(400).json({error:"Please login with valid credentials"});
        }
        const passCompare=await bcrypt.compare(password,user.password);
        if(!passCompare){
            return res.status(400).json({error:"Please login with valid credentials"});
        }
        const data={ // signing auth token with id as id is the fastest way to retrieve the data from the data base
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_SECRET); // signing the data with string(any) and generete a token for the user
        res.json({authtoken});

    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error")
    }



})

// ROUTE 3 : Get user details using POST "/api/auth/getuser". Login required.
router.post("/getuser",fetchuser, async (req, res) => {
        try {
            userId=req.user.id;
            const user=await User.findById(userId).select("-password");
            res.send(user)
        } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error")
        }
})


module.exports = router;
