const express = require("express");
const mongoose = require("mongoose");
const user = require("./src/routes/user")
const file = require("./src/routes/file")


const app = express();

mongoose.connect("mongodb://localhost:27017/FileBox")
        .then(()=> console.log("db connected"))
        .catch((err)=> console.log(err));


app.use(express.json())


app.use("/user", user)
app.use("/file", file)


app.listen(3000).on("listening", ()=>{
    console.log("listening on 3000")
})

