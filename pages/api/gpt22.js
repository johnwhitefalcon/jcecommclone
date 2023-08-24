
import { Configuration, OpenAIApi } from "openai";

// Initialize OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Handler function for the API endpoint
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt1 } = req.body;
      console.log(prompt1);

      const completion = await generateCompletion(prompt1);

      const resultText = extractGeneratedText(completion);
      console.log("Generated result:", resultText);

      res.status(200).json({ result: resultText });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  }
}

// Generate a completion using OpenAI API
async function generateCompletion(prompt1) {
  const prompt = generatePrompt(prompt1);
  
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 100, // Increase tokens for more elaborate responses
    temperature: 0.6, // Adjust temperature for response creativity
  });

  return completion;
}

// Generate a prompt for disciplinary meeting letter
function generatePrompt(prompt1) {
  return `

The text below is a typical disciplinary invitation letter.

 
 Hello ${prompt1} [space]
 
You are required to attend a meeting to discuss concerns about your attendance at work
 
   Location: 
   Date:
   Time: 
[space]

The attendance concerns are

 You are able to bring a support person to the meeting


 Instruction 1: Write a disciplinary invitation letter for ${prompt1}. 
 Instruction 2: Insert a creative location for the meeting
 Instruction 3: Insert 1 September as the Date
 Instruction 4: Insert 11am for the Time.
 Instruction 5: Do not finish with Regards, Sincerely, Yours Faithfully or any similar text
 

 `;
}

// Extract the generated text from completion
function extractGeneratedText(completion) {
  const rawText = completion.data.choices[0].text;
  const cleanedText = rawText
    .replace(/(\n|\nI)/g, ' ') // Replace newline characters with spaces
    .replace(/\s+/g, ' ')      // Replace multiple spaces with a single space
    .trim();                   // Trim leading and trailing whitespace

  return cleanedText;
}
