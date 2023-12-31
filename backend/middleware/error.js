const ErrorHender = require('../utils/errorhander')

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong MongoDB ID Error
    if(err.name === "CastError"){
        const message = `resource not Found. Invalid: ${err.path}`;
        err = new ErrorHender(message,400);
    }

    // Mongoose Duplicate key error
    if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHender(message, 400);
    }

    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHender(message, 400);
    }

    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHender(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};