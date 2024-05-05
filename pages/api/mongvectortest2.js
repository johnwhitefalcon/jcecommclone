

import { connectToDatabase } from '../../util/mongodb'
import { flatten } from 'flat'

export default async function handler(req, res) {



        const {db} = await connectToDatabase();

     
        const result = await db.collection('mongcollect').find({}).limit(1).toArray();
    
        
    //    const one = res.status(200).json(result)

    //    const vectors = await db.collection('mongcollect').find({}).toArray();

    //    const two = res.status(200).json(vectors)
     

        // Query vector
        const queryVector1 = result[0].result.data;

// Parse the JSON data
    //    const parsedData = JSON.parse(queryVector1);
        
        // Access the embedding array
        const embeddingArray = queryVector1[0].embedding;
        
        // Filter out only the numerical values
    //    const final = embeddingArray.filter(value => typeof value === 'number');

          const black = res.status(200).json({ embeddingArray });


}







