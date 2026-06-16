const { generateItinerary } = require("../service_ai/gemini_service");
const fs = require("fs");
const pdfParse = require("pdf-parse").default || require("pdf-parse");
//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
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
    const pdfBuffer = fs.readFileSync(req.file.path);
    console.log('type',typeof pdfParse);
     const pdfData = await pdfParse(pdfBuffer);
    const itinerary = await generateItinerary(pdfData.text);
    const booking = await BookingModel.create({
      UserId: req.user?.id || "test-user",
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