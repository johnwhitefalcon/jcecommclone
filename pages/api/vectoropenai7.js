



import { Configuration, OpenAIApi } from "openai";

// Initialize OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { prompt1 } = req.body;


    const embeddingRes = await openAi.createEmbedding({
        model: 'text-embedding-ada-002',
        input: prompt1
    });

    const [{embedding}] = embeddingRes.data.data;
    res.status(200).json({ result: embedding });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  }
}


