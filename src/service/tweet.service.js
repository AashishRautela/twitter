const {TweetRepository, HashtagRepository}=require("../repository/index.js")
const AppError=require("../utils/errors/appError.js")
const { StatusCodes } = require('http-status-codes');


module.exports.createTweet = async (data) => {
    try {
      const { content } = data;
  
      // 1. Extract hashtags from content
      const hashtags = content.match(/#[a-zA-Z0-9_]+/g) || [];
      const filteredHasTags = hashtags.map((tag) => tag.substring(1).toLowerCase());
  
      // 2. Create the Tweet first
      const tweet = await TweetRepository.create({ content });
  
      // 3. Find existing hashtags
      const existingTags = await HashtagRepository.find({ title: filteredHasTags });
      const existingTagTitles = existingTags.map((tag) => tag.title);
  
      // 4. Create hashtags that don't already exist
      const tagsToBeCreated = filteredHasTags.reduce((acc, curr) => {
        if (!existingTagTitles.includes(curr)) {
          acc.push({ title: curr, tweets: [tweet._id] });
        }
        return acc;
      }, []);
  
      // 5. Bulk insert new hashtags
      const createdTags = await HashtagRepository.bulkCreate(tagsToBeCreated);
  
      // 6. Update existing hashtags to add the tweet reference
      await Promise.all(
        existingTags.map(async (tag) => {
          if (!tag.tweets.includes(tweet._id)) {
            tag.tweets.push(tweet._id);
            await tag.save();
          }
        })
      );
  
      // 7. Combine all hashtag IDs and link to tweet
      const allHashtagIds = [...createdTags, ...existingTags].map((tag) => tag._id);
      tweet.hashtags = allHashtagIds;
      await tweet.save();
  
      return {};
    } catch (error) {
      console.log('error -->', error);
      if (error instanceof AppError) throw error;
  
      throw new AppError(
        ['Something went wrong while creating tweet'],
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  };
  