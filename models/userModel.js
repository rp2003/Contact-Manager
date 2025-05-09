const mongoose=require("mongoose");

const userSchema =mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    email:{
        type:String,
        required:[true,"Please add the user email address"],
        unique:[true,"Email Address already registered"],
    },
    password:{
        type:String,
        required: [true, "Please add the Password"],
    }
},
{
    timestamps: true,
}
);

module.exports=mongoose.model("User", userSchema)