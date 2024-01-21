
export default async function handler(req, res) {
    const { input } = req.body;
  
    if (!input) {
      return res.status(400).json({ error: 'Bad Request', message: 'Input is required.' });
    }
  
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const OPENAI_API_URL = 'https://api.openai.com/v1/embeddings';
  
    try {
      const response = await fetch(OPENAI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          input,
          model: 'text-embedding-ada-002',
        }),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

