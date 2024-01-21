
import { MongoClient } from 'mongodb';
import { Configuration, OpenAIApi } from "openai";

// Initialize OpenAI API configuration
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { word } = req.body;

    try {
      // Use OpenAI to generate a vector representation for the word
      const openaiResponse = await openai.Completion.create({
        engine: 'text-davinci-003',
        prompt: `Generate a vector representation for the word "${word}"`,
        max_tokens: 50, // Adjust as needed
      });

      const vector = openaiResponse.choices[0]?.text?.trim().split(',').map(Number) || [];

      // Connect to MongoDB Atlas
      const client = await new MongoClient.connect('mongodb+srv://johnwhitefalcon:Flow8404@cluster0.ufllo.mongodb.net/mongdbase?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    //  const db = client.db();

      const clientPromise  = await client.connect()

  
      const db = await clientPromise.db(dbname);
      
    //  return {db}







      // Insert the word and its vector into the database
      await db.collection('mongcollect').insertOne({
        word,
        vector,
      });

     

      res.status(200).json({ message: 'Word and vector stored successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error storing word and vector' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}