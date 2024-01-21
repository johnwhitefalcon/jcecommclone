

import OpenAI from "openai"

const apikey = process.env.OPENAI_API_KEY;

if(!apikey){

throw Error ("say error")

}

const openai = new OpenAI({apikey});

export default openai

export async function getEmbedding (text) {

    const responseg = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: text,
        
      });

const embedding = response.data[0].embedding;

if(!embedding){
    throw Error("throwing error")
}

return embedding



    }


