
import { getVectorEmbedding } from '../../util/vector';
import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { db } = await connectToDatabase();

    const { word } = req.body;

    // Get the vector embedding from OpenAI
    const vectorEmbedding = await getVectorEmbedding(word);

    // Save the results to MongoDB
    const resultMongoDB = await db.collection('mongcollect').insertOne({ word, vectorEmbedding });

    // Second fetch POST to MongoDB
    const responseMongoDB = await fetch('/api/mongodb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resultFromOpenAI: vectorEmbedding }),
    });

    const resDataMongoDB = await responseMongoDB.json();
    console.log(resDataMongoDB);

    res.status(200).json({ resultMongoDB, resultFromMongoDB: resDataMongoDB });
  }
}
