// NOTE: As we are going to use mongodb which returns a promise so we have to use async in all functions. So in async function we need a try catch to handle a error to avoid doing it for all functions. we use middleware i.e. express async handler
const asyncHandler= require("express-async-handler");

// password is encrypted so to decrypt th password we download this library : npm i bcrypt
const bcrypt=require("bcrypt");

// To install JsonWebToken: npm i jsonwebtoken
//JWT token have 3 parts:
//header: it has the algorithm and token type
//payload: it stores the info like username, email, etc 
//Verify Signature: verifies the token wasn't changed
const jwt= require("jsonwebtoken")

// We are including the user table from the mongoose to check if the user is available
const User=require ("../models/userModel")



//@desc Register a user
// @route Post api/users/register
//@access public
const registerUser= asyncHandler(async (req, res)=>{
    const {username, email, password}=req.body;

    // check for missing fields
    if (!username || !email || !password)
    {
        res.status(400);
        throw new Error ("All fields are mandatory!")
    }

    // check if user ready exists
    const userAvailable=await User.findOne({email}); 
    // const userAvailable=await User.findOne({email: email}); can be also written like this
    // why we are using User.findOne({email}); instead of User.findOne(email);
    // Because {email} is shorthand for {email : email} which means looking in the email column where the email in the table is same as the value of email passed in parameter.

    if(userAvailable)
    {
        res.status(400);
        throw new Error("User already registered!")
    }

    // Hashed Password
    const hashedPassword= await bcrypt.hash(password, 10);
    console.log("hashedPassword: ", hashedPassword);

    // creating a new user
    const user =await User.create({
        username,           //shorthand for username= username 
        email,              //shorthand for email = email
        password: hashedPassword,
    })
    console.log(`User created ${user}`);
    if(user)
    {
        res.status(201).json({_id: user.id, email: user.email});
    }
    else{
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.json({message:"Register the user"})
});

//@desc Login a user
// @route Post api/users/login
//@access public
const loginUser=asyncHandler(async (req,res)=>{
    const {email, password}=req.body
    if(!email|| !password)
    {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    // checks if we have existing user
    const user =await User.findOne({email});
    // compares the password with hashed password
    if(user&& (await bcrypt.compare(password, user.password))){ // check if password matches
        const accessToken =jwt.sign({   // jwt has a predefined sign in function that can create a new token and you can pass any info into the token in its payload.
           user:{
            username:user.username,
            email:user.email,
            id:user.id,
           } 
        }, process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
        );
        res.status(200).json({accessToken})
    } 
    else{
        res.status(401)
        throw new Error("Email or Password is not valid")
    }
})

//@desc Current user info
// @route Get api/users/current
//@access private (Only logged in user can access)
const currentUser=asyncHandler(async (req,res)=>{
    res.json({message: "Current User Interface"})
})

module.exports={
    registerUser,
    loginUser,
    currentUser

};

