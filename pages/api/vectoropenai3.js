

const configuration = {
    'Content-Type': 'application/json',
    apiKey: process.env.OPENAI_API_KEY,
  };

  export default async function createEmbedding(req, res){
    if (req.method === 'POST') {
        try {
    const { prompt1} = req.body;

    const response = await fetch(`https://api.openai.com/v1/embeddings`, {
    method:'POST',
    headers: configuration,
    body: JSON.stringify({
        model: "text-embedding-ada-002",
        input: prompt1,

    })
    }
    
    )
    const data = await response.json();

    res.status(200).json({ data });
    console.log(data)
        }catch (error) {
            console.error("Error:", error.message);
            res.status(500).json({ error: "An error occurred while processing the request." });
          }





        }
  }