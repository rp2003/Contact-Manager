//@desc Get all contacts
// @route Get /api/contacts
//@access public

const getContact= (req,res)=>{
    res.status(200).json({message: "Get all contacts"});
} 

//@desc Post contact
//@route Post /api/contacts
//@access public
// status 201 is for created
const createContact= (req,res)=>{
    res.status(201).json({message: "create contacts"});
}

//@desc Get contact by ID
//@route Get /ap/contacts/:id
//@access public

const getContactByID = (req,res)=>{
    res.status(200).json({message: `get contact by id ${req.params.id}`});
}


//@desc Update contact by ID
//@route Put /ap/contacts/:id
//@access public
const updateContact = (req,res)=>{
    res.status(200).json({message: `update contacts ${req.params.id}`});
}


//@desc Delete contact by ID
//@route delete /ap/contacts/:id
//@access public
const deleteContact = (req,res)=>{
    res.status(200).json({message: `delete contacts ${req.params.id}`});
}


module.exports={
    getContact, 
    createContact, 
    getContactByID, 
    updateContact, 
    deleteContact
}