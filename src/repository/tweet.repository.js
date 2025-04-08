const CrudRepository=require("./crud.repository.js");
const {Tweet}=require("../models/index.js")

class TweetRepository extends CrudRepository{
    constructor(){
        super(Tweet)
    }
}

module.exports=new TweetRepository();