
import { connectToDatabase } from '../../util/mongodbmflix';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { db } = await connectToDatabase();

    const result = await db.collection('movies').find({}).limit(10).toArray();

    const response = res.status(200).json(result);
    console.log(response);
  }
}
