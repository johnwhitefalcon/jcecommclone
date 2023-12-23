
import { connectToDatabase } from '../../util/ordersdb'

export default async function handler(req, res) {

 if (req.method === 'POST') {   
    const {db} = await connectToDatabase();

    const red = req.body; 
     
    const result = await db.collection('ordersdbase').insertOne(red);

    const one = res.status(200).json(red)
    console.log(red)
 
    }
}
  
   



