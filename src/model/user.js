const mongoose = require("mongoose");
const Schema = mongoose.Schema;

 const userSchema = new Schema({
     name: {type: String}, 
     email: {type: String, required: true, unique: true} ,
     password: {type: String, require: true},
 })

 const user = mongoose.model("user", userSchema); // ToDo => user||User or somthing else
  module.exports = user