const {UploadFile,getHistory } = require('../Controller/pdfController');
const auth=require('../Middleware/Auth');
const upload=require('../Middleware/Upload');

const express= require('express');

const router= express.Router();

router.get('api/history',auth,getHistory)
router.post("api/upload", auth,upload.single("file"),UploadFile);

module.exports=router;
