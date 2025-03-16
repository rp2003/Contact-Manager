// NOTE: As we are going to use mongodb which returns a promise so we have to use async in all functions. So in async function we need a try catch to handle a error to avoid doing it for all functions. we use middleware i.e. express async handler
const asyncHandler= require("express-async-handler");

//@desc Get all contacts
// @route Get /api/contacts
//@access public

const getContact= asyncHandler(async(req,res)=>{
    res.status(200).json({message: "Get all contacts"});
});

//@desc Post contact
//@route Post /api/contacts
//@access public
// status 201 is for created
const createContact= asyncHandler(async(req,res)=>{
    console.log("The request Body :",req.body);
    const {name, email,phone} =req.body;
    if(!name|| !email|| !phone)
    {
        res.status(400);
        throw new Error("All fields are mandatory.")
    }
    res.status(201).json({message: "create contacts"});
});

//@desc Get contact by ID
//@route Get /ap/contacts/:id
//@access public

const getContactByID = asyncHandler(async (req,res)=>{
    res.status(200).json({message: `get contact by id ${req.params.id}`});
});


//@desc Update contact by ID
//@route Put /ap/contacts/:id
//@access public
const updateContact = asyncHandler( async (req,res)=>{
    res.status(200).json({message: `update contacts ${req.params.id}`});
});


//@desc Delete contact by ID
//@route delete /ap/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res)=>{
    res.status(200).json({message: `delete contacts ${req.params.id}`});
});


module.exports={
    getContact, 
    createContact, 
    getContactByID, 
    updateContact, 
    deleteContact
}