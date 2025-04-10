const CrudRepository=require("./crud.repository.js");
const {HashTag}=require("../models/index.js")

class HashtagRepository extends CrudRepository{
    constructor(){
        super(HashTag)
    }
}

module.exports=new HashtagRepository();