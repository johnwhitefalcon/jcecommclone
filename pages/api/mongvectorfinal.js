

 
import { MongoClient } from "mongodb";

export default async function handler(req, res) {

  if (req.method === 'POST') { 
const {data} = req.body  
const uri = 'mongodb+srv://johnwhitefalcon:Flow8404@cluster0.ufllo.mongodb.net/mongdbase?retryWrites=true&w=majority'
const dbname = 'mongdbase'

  const client = new MongoClient(uri);

  try {
    
    await client.connect();

    const database = client.db("mongdbase");
    const collection = database.collection("mongcollect");

    const agg = [
      {
        $vectorSearch: {
          index: "jcindex",
          path: "data.embedding",
          queryVector: req.body,
          limit: 10,
          numCandidates: 100,
        },
      },
    ];

    const result = await collection.aggregate(agg).toArray();
    
    res.status(200).json({ result });
    
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await client.close();
  }
}
}




