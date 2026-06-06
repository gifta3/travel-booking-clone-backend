const fs=require('fs');
const pdfParse=require('pdf-parse');
const BookingModel = require("../Model/BookingModel");

const UploadFile=async(req,res)=>{
try{
    const pdfBuffer=fs.readFileSync(req.file.path);
    const pdfData=await PDFParse(pdfBuffer);
    console.log(pdfData.text);
    res.json({extractedText:pdfData.text,});
}catch(error){
    console.error(error);
    res.status(500).json({message:'Failed to parse pdf'});
} 
};

const getHistory = async (req, res) => {
  try {
    const history = await BookingModel.find({
      userId: req.user.id,
    });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};


module.exports={UploadFile,getHistory};