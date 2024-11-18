const express = require("express");
const upload = require("../middleware/multer")
const { authentication, authorization } = require("../middleware/validation");
const { uploadFile, downloadFile, deleteFile, updateFile, getAllFiles } = require("../controller/file");
const router = express.Router();

router.post("/upload", authentication, upload.single("file"), uploadFile)
router.get("/download/:fileId", authentication, downloadFile)
router.delete("/delete/:fileId", authentication, authorization, deleteFile)
router.put("/rename/:fileId", authentication, authorization, updateFile)
router.get("/files", authentication, getAllFiles)



module.exports = router;