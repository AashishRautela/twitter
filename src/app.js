const express=require("express");
const cookieParser=require("cookie-parser")
const app=express();


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))



//import routes
const routes=require("./routes/index.js");
app.use("/",routes);

//use routes

module.exports={app}