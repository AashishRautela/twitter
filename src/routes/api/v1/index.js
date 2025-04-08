const tweetRouter=require("./tweet.routes.js")
const express=require("express");
const router=express.Router();

router.use("/tweet",tweetRouter)

module.exports=router;