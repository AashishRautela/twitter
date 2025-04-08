const mongoose=require("mongoose");

const tweetSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
        max:[250,"Tweet can not be more than 250 characters"]
    },
    hastags:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HashTag"
    }]
},{
    timestamps:true
})

const Tweet= new mongoose.Model("Tweet",tweetSchema);

module.exports=Tweet;