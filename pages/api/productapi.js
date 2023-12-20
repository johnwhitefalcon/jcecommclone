


import { connectToDatabase } from '../../util/productdb'

export default async function handler(req, res) {

 if (req.method === 'POST') {   
    const {db} = await connectToDatabase();

    const red = req.body; 
     
    const result = await db.collection('productcollect').insertOne(red);

    const one = res.status(200).json(red)
    console.log(red)
 
    }
}
  
   



