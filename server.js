const express= require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();

const app=express()

const port= process.env.PORT||5000;

//middleware for handling the json data
app.use(express.json());    // handles the json data that client gave.

app.use("/api/contacts", require("./routes/contactRoutes"))
app.use(errorHandler); // imported it

app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})