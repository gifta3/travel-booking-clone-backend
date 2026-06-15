const { generateItinerary } = require("../service_ai/openai_service");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const BookingModel = require("../Model/BookingModel");

const UploadFile = async (req, res) => {
  try {
    console.log('req file:',req.file);
    if (!req.file) {
          console.log('req file not found');
  return res.status(400).json({
    message: "No file received",
  });
}
console.log("REQ FILE:", req.file);
console.log("FILE PATH:", req.file?.path);
console.log("FILE EXISTS:", fs.existsSync(req.file?.path));
//console.log("PATH:", req.file.path);
    const pdfBuffer = fs.readFileSync(req.file.path);
    const pdfData = await pdfParse(pdfBuffer);
    const itinerary = await generateItinerary(pdfData.text);
    const booking = await BookingModel.create({
      UserId: req.user.id,
      UploadedFile: req.file.filename,
      ExtractedText: pdfData.text,
      Itinerary: itinerary,
      Status: "completed",
    });
    res.status(200).json({
      message: "File uploaded successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to process file",
    });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await BookingModel.find({
      UserId: req.user.id,
    }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch history",
    });
  }
};

module.exports = {UploadFile,getHistory,};