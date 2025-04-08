const mongoose=require("mongoose");

const hashTagSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    tweets:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tweet",
    }
    ]
},{
    timestamps:true
})

const HashTag= new mongoose.Model("HashTag",hashTagSchema);

module.exports=HashTag;