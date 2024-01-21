
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
      const { prompt1} = req.body;
      console.log(prompt1);

      const completion = await generateCompletion(prompt1);


      res.status(200).json({ result: completion });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  }
}

// Generate a completion using OpenAI API
async function generateCompletion(prompt1) {
  
  
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: prompt1,
    encoding_format: "float",
  });

  return embedding;
}



