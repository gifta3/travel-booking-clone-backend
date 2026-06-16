const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateItinerary(text) {
  try {
    console.log("Gemini key exists:", !!process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
    });
    const prompt = `
You are a travel assistant.
Extract the travel itinerary from the following document and present it in a clear format.
Document:
${text}
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

module.exports = { generateItinerary };
/*
async function generateItinerary(text) {
  try {
    console.log("Gemini key exists:", !!process.env.GEMINI_API_KEY);

    return "Gemini service reached successfully";
  } catch (error) {
    console.error(error);
    throw error;
  }
}
*/
