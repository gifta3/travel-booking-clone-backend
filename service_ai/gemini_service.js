const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
/*
const generateItinerary = async (text) => {
  try {
    console.log('gemini key', !! process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });
const prompt = `
You are a travel assistant.
Extract travel itinerary from this text and structure it nicely:
${text}
`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
*/
async function generateItinerary(text) {
  try {
    const models = await genAI.listModels();
    console.log(models);

    return "Model test complete";
  } catch (error) {
    console.error(error);
    throw error;
  }
}
module.exports = { generateItinerary };