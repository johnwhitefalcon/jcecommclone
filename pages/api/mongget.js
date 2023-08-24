

import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res) {

 if (req.method === 'GET') {   
    const {db} = await connectToDatabase();

     
    const result = await db.collection('mongcollect').find({}).toArray();


    const one = res.status(200).json(result)
    console.log(one)
 
    }
}
  
   


