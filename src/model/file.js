const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const fileSchema = new Schema({
     userId: { type: ObjectId, required: true,  ref: "user"},
     fileName: {type: String, required: true},
     fileSize: {type: Number, required: true},
     fileType: {type: String, required: true},
     s3Key: {type: String},
     s3Url: {type: String},
},
    {timestamps: true}
)


const file = mongoose.model("file", fileSchema);

module.exports = file;
