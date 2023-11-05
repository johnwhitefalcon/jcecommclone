

import { Configuration, OpenAIApi } from "openai";
import { writeFileSync} from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { prompt1 } = req.body;
     

      const response = await openai.createImage({
        prompt: prompt1,
        n: 1,
        size: "1024x1024",
    });

    const url = res.status(200).json({ imageURL: response.data.data[0].url })
    
    const imgResult = await fetch(url)
    const blob = await imageResult.blob()
    const buffer = Buffer.from(await blob.arrayBuffer())
    const dfile = 'C/JCTest/dallefile.png';
writeSyncFile(dfile, buffer)

    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "An error occurred while processing the request." });
    }
  }
}






