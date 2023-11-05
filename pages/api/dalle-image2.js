


import { Configuration, OpenAIApi } from "openai";
import { writeFileSync} from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  
      const prompt1 = "amplifier"
     

      const response = await openai.createImage({
        prompt: prompt1,
        n: 1,
        size: "1024x1024",
    });

    const url = res.status(200).json({ imageURL: response.data.data[0].url })
    
    const imgResult = await fetch(url)
    const blob = await imageResult.blob()
    const buffer = Buffer.from(await blob.arrayBuffer())
    const dfile = `C/JCTest/dallefile.png`;
writeSyncFile(dfile, buffer)

  }




