// NOTE: As we are going to use mongodb which returns a promise so we have to use async in all functions. So in async function we need a try catch to handle a error to avoid doing it for all functions. we use middleware i.e. express async handler
const asyncHandler= require("express-async-handler");

// imports the contact schema which is further used to apply crud commands on the database
const Contact= require("../models/contactModel");

//@desc Get all contacts
// @route Get /api/contacts
//@access public

const getContact= asyncHandler(async(req,res)=>{
    const contacts= await Contact.find();
    res.status(200).json(contacts);
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
    // if key and the value are same then we don't need name= name as we have destructed it in above line const {name, email,phone} =req.body;
    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact);
});

//@desc Get contact by ID
//@route Get /ap/contacts/:id
//@access public

const getContactByID = asyncHandler(async (req,res)=>{
    const contact= await Contact.findById(req.params.id);
    
    if (!contact){
        // console.log("Contact not found");
        // res.status(404);
        // throw new Error("Contact Not Found");
        const error = new Error("Contact Not Found");   // Create an error object
        error.statusCode = 404;                         // Attach statusCode directly to the error
        throw error;                                    // Throw the customized error
    }
    res.status(200).json(contact);
});


//@desc Update contact by ID
//@route Put /ap/contacts/:id
//@access public
const updateContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact= await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
});


//@desc Delete contact by ID
//@route delete /ap/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
    {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne()
    res.status(200).json(contact);
});


module.exports={
    getContact, 
    createContact, 
    getContactByID, 
    updateContact, 
    deleteContact
}