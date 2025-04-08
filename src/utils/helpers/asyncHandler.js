const {ErrorResponse}=require("../common/index.js");
const { StatusCodes } = require('http-status-codes');

module.exports.asyncHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log('error--->', error)
            ErrorResponse.error = error;
            return res
              .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
              .json(ErrorResponse);
        }
    };
};
