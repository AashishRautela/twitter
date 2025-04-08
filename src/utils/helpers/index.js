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

module.exports.generateRandomColorLight = async () => {
  return new Promise((resolve, reject) => {
    try {
      const colors = [
        '#F06D85',
        '#2EB6C9',
        '#F0C76D',
        '#20B486',
        '#0078D7',
        '#904EE2',
        '#45B6DA',
        '#602EC9',
        '#FF914D'
      ];
      const getRandomColor = () =>
        colors[Math.floor(Math.random() * colors.length)];
      resolve(getRandomColor());
    } catch (error) {
      reject(error);
    }
  });
};
