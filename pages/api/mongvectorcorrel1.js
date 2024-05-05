

import { connectToDatabase } from '../../util/mongodb'

export default async function handler(req, res) {


        const {db} = await connectToDatabase();

     
        const result = await db.collection('mongcollect').find({}).limit(1).toArray();
    
        
    //    const one = res.status(200).json(result)

        const vectors = await db.collection('mongcollect').find({}).toArray();

    //    const two = res.status(200).json(vectors)
     

        // Query vector
        const queryVector = result[0];
         const similarities = vectors.map(vector => {
            const similarity = calculateCosineSimilarity(queryVector, vector);
            return similarity;
        });

        // Find the largest similarity value
        let largestSimilarity = 0; // Initialize with 0
        for (let i = 0; i < similarities.length; i++) {
            if (similarities[i] > largestSimilarity) {
                largestSimilarity = similarities[i];
            }
        }

        res.status(200).json({ vectors });
   
}

// Function to calculate cosine similarity between two vectors
function calculateCosineSimilarity(vector1, vector2) {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    for (let i = 0; i < vector1.length; i++) {
        dotProduct += vector1[i] * vector2[i];
        magnitude1 += Math.pow(vector1[i], 2);
        magnitude2 += Math.pow(vector2[i], 2);
    }

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    if (magnitude1 !== 0 && magnitude2 !== 0) {
        return dotProduct / (magnitude1 * magnitude2);
    } else {
        return 0;
    }
}




