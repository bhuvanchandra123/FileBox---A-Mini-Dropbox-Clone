const fileModel = require("../model/file");


const uploadFile = async (req, res)=>{
    const uploadedFile = req.file;
    // console.log("hellow wolrd")
    const userId = req.user._id;
    if(!uploadedFile){
        return res.status(400).json({status: false, message: "please upload the file first"})
    }
  try{
    const existFile = await fileModel.findOne({userId, fileName: file.originalname });
    if (existFile) {
        return res.status(400).json({ status: false, message: "File already exists" });
    }
    const newFile = await fileModel.create({
        userId,
        fileName: file.originalname,
        fileSize: file.size,
        fileType: file.mimetype,
    })

    return res.status(200).json({ status: true, message: "File uploaded successfully", data: newFile });
  }catch (error) {
    console.error("Error in uploadFile:", error);
    return res.status(500).json({ status: false, message: "An error occurred while uploading the file" });
  }
} ;


const downloadFile = async (req, res)=>{
    const {fileId} = req.params;
    if(!fileId){
      return res.status(400).json({status: false, message: "fileId is missing"})
    }
    try{
       const file = await fileModel.findById(fileId);
       if(!file){
         return res.status(400).json({status: false, message: "file not found"})
       }
       return res.status(200).json({ status: true, message: "File found", data: file });
    }catch{
      return res.status(500).json({ status: false, message: "An error occurred while downloading the file" });
    }
};


const deleteFile = async ()=>{
      const {fileId} = req.params;
      if(!fileId){
        return res.status(400).json({status: false, message: "fileId is missing"})
      }
    try{
      const existFile = await fileModel.findById({fileId})
      if(!existFile){
        return res.status(400).json({status: false, message: "file not found"})
      }
      await fileModel.findByIdAndDelete(fileId)
      return res.status(200).json({ status: true, message: "file deleted successfully"});
    }catch(err){
      return res.status(500).json({status: false, message: err})
    }
};


const updateFile = async() => {
    const {fileId} = req.params;
    const fileName = req.body;
    if(!fileId){
      return res.status(400).json({status: false, message: "fileId is missing"})
    }
  try{
    const existFile = await fileModel.findById({fileId})
    if(!existFile){
      return res.status(400).json({status: false, message: "file not found"})
    }
    await fileModel.findByIdAndUpdate({fileName})
    return res.status(200).json({ status: true, message: "file name updated successfully"});
  }catch(err){
    return res.status(500).json({status: false, message: err})
  }
}


const getAllFiles = async() =>{
     try{
        const files = fileModel.find();
        if(files.length === 0){
          return res.status(400).json({status: false, message: "files not found"})
        }
          return res.status(200).json({status: true, message : "file found successfully", data: files})
     }catch(err){
        return res.status(500).json({status: false, message: err})
     }
};

module.exports = {uploadFile, downloadFile, deleteFile, updateFile, getAllFiles}