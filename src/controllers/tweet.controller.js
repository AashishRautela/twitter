const { StatusCodes } = require("http-status-codes");
const { TweetService } = require("../service/index.js")
const {SuccessResponse}=require("../utils/common/index.js");
const {asyncHandler}=require("../utils/helpers/asyncHandler.js")
const AppError = require("../utils/errors/appError.js");

module.exports.createTweet = asyncHandler(async (req, res) => {
    const {content}=req.body;

    if(!content){
        throw new AppError(["Request data missing"],StatusCodes.BAD_REQUEST)
    }
    const tweet = await TweetService.createTweet(req.body);
    SuccessResponse.data=tweet;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  });