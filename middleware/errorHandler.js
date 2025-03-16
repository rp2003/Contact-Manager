// const {constants}= require("../constants")

// const errorHandler= (err, req, res, next) =>{
//     const statusCode= res.statusCode?res.statusCode:500;    // if we have a statusCode then give that else 500

//     switch(statusCode)
//     {
//         case constants.VALIDATION_ERROR:
//             res.json({
//                 title:"Validation Error", message:err.message, stackTrace:err.stack,
//             });  
//             break;
//         case constants.NOT_FOUND:
//             res.json({
//                 title:"Not Found", 
//                 message:err.message, stackTrace:err.stack,
//             });
//             break;
//         case constants.UNAUTHORIZED:
//             res.json({
//                 title:"unauthorized", 
//                 message:err.message, stackTrace:err.stack,
//             });
//             break;
//         case constants.FORBIDDEN:
//             res.json({
//                 title:"Forbidden", 
//                 message:err.message, stackTrace:err.stack,
//             });
//             break
//         case constants.SERVER_ERROR:
//             res.json({
//                 title:"Server Error", 
//                 message:err.message, stackTrace:err.stack,
//             });
//             break
//         default:
//             console.log("No Error, All Good!")
//             break;
//     }
    
// };

// module.exports=errorHandler

// // mongodb+srv://22riyapuri:<db_password>@cluster0.5e4ex.mongodb.net/


const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || res.statusCode || 500;  // ✅ Check `err.statusCode` first

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.status(400).json({
                title: "Validation Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.status(404).json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(401).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.status(403).json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.SERVER_ERROR:
            res.status(500).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        default:
            console.log("No Error, All Good!");
            res.status(500).json({ message: "Unknown Error Occurred" });
            break;
    }
};

module.exports = errorHandler;
