

import { connectToDatabase } from '../../util/productdb'

export default async function handler(req, res) {

 if (req.method === 'GET') {   
    const {db} = await connectToDatabase();

     
    const result = await db.collection('productcollect').find({}).toArray();


    const one = res.status(200).json(result)
    console.log(one)
 
    }
}
  
   


