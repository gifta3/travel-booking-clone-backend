const {UploadFile,getHistory } = require('../Controller/pdfController');
const auth=require('../Middleware/Auth');
const upload=require('../Middleware/Upload');

const express= require('express');

const router= express.Router();

router.get('/history',auth,getHistory)
router.post("/upload", auth,upload.single("file"),UploadFile);

module.exports=router;
