




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
     

      const response = await openai.createImage({
        prompt: prompt1,
        n: 1,
        size: "1024x1024",
    });

    res.status(200).json({ imageURL: response.data.data[0].url })
    console.log('Response sent successfully:', { imageURL: response.data.data[0].url });

    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  }
}






