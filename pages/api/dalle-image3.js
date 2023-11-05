
import { Configuration, OpenAIApi } from "openai";
import { writeFileSync} from 'fs'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  
      const {prompt1} = req.body
     

      const response = await openai.createImage({
        prompt: prompt1,
        n: 1,
        size: "1024x1024",
    });

    res.status(200).json({ result: response.data.data[0].url })
    


  }


