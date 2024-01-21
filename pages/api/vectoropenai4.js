

import { Configuration, OpenAIApi } from "openai";

// Initialize OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

export default async function handler(input) {
    const embeddingRes = await openAi.createEmbedding({
        model: 'text-embedding-ada-002',
        input: 'dog'
    });

    const [{embedding}] = embeddingRes.data.data;
    return embedding
}

