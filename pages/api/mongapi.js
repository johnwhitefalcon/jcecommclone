

import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res) {

 if (req.method === 'POST') {   
    const {db} = await connectToDatabase();

    const red = req.body; 
     
    const result = await db.collection('mongcollect').insertOne(red);

    const one = res.status(200).json(red)
    console.log(red)
 
    }
}
  
   








  
  
  

