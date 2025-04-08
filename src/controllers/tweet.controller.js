const { StatusCodes } = require("http-status-codes");
const { TweetService } = require("../service/index.js")
const {asyncHandler, SuccessResponse}=require("../utils/common/index.js")

module.exports.createTweet = asyncHandler(async (req, res) => {
    const tweet = await TweetService.createTweet(req.body);
    SuccessResponse.data=tweet;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  });