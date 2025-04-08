const {TweetController}=require("../../../controllers/index.js")
const express=require("express");
const router=express.Router();

router.post("/",TweetController.createTweet);

module.exports=router;