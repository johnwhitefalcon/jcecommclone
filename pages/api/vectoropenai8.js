
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { prompt1 } = req.body;

fetch('https://api.openai.com/v1/embeddings', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
  },
  // body: '{\n    "input": "Your text string goes here",\n    "model": "text-embedding-ada-002"\n  }',
  body: JSON.stringify({
    'input': prompt1,
    'model': 'text-embedding-ada-002'
  })
})

 }}
