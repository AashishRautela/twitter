const { StatusCodes } = require("http-status-codes");
const AppError = require("../utils/errors/appError");

class CrudRepository{
    constructor(model){
        this.model=model
    }

    async create(data){
        const response=await this.model.create(data);
        return response;
    }

    async get(data){
        const response=await this.model.findById(data);
        if(!response){
            throw new AppError(["Resource not found"],StatusCodes.NOT_FOUND);
        }
        return response;
    }
}

module.exports=CrudRepository