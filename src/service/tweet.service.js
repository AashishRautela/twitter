const {TweetRepository}=require("../repository/index.js")
const AppError=require("../utils/errors/appError.js")
const { StatusCodes } = require('http-status-codes');


module.exports.createTweet=async(data)=>{
    try {
        const {content}=data;

        const hastags=content.match(/#[a-zA-Z0-9]+/g);
        const filteredHasTags=hastags.map((tag)=>tag.substring(1));
        const tweet=await TweetRepository.create(data);
        return tweet;
    } catch (error) {
        if(error instanceof AppError) throw error;

        throw new AppError(["Something went wronh while creating tweet"],StatusCodes.INTERNAL_SERVER_ERROR)
    }
}