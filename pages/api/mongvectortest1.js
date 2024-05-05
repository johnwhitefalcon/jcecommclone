



import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res) {


        const {db} = await connectToDatabase();

     
        const result = await db.collection('mongcollect').find({}).limit(1).toArray();
    
        
    //    const one = res.status(200).json(result)

        const vectors = await db.collection('mongcollect').find({}).toArray();

    //    const two = res.status(200).json(vectors)
     

        // Query vector
        const queryVector1 = [result[0].data.embedding];
 


        const agg = [
            {
              $vectorSearch: {
                index: "jcindex",
                path: "data.embedding",
                queryVector: queryVector1,
                limit: 10,
                numCandidates: 100,
              },
            },
          ];
      
          const finalresult = await db.collection('mongcollect').aggregate(agg).toArray();
          
          const black = res.status(200).json({ finalresult });


}








