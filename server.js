const express= require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();

connectDb();

const app=express()

const port= process.env.PORT||5000;

//middleware for handling the json data
app.use(express.json());    // handles the json data that client gave.

app.use("/api/contacts", require("./routes/contactRoutes"))

app.use("/api/users", require("./routes/userRoutes")) // Added a route for user Authentication
app.use(errorHandler); // imported it

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})