const openai = require('openai');
const openai=newOpenAI({
    apikey:Process.env.OpenAI_API_KEY,
});

async function generateItinerary(extractedText) {
    const completion=await openai.chat.completions.create({
        model:'gpt-4.1-mini',
        messages:[
            {
                role:'user',
                content:`Extract booking informatuon and create a travel itinerary.
                        Document Text:${extractedText}`,
            }
        ],
    });
return completion.choices[0].message.content;
}

Module.exports={generateItinerary};