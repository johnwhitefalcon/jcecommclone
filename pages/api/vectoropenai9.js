

export default async function handler(req, res) {
    // Replace 'your_openai_api_key' with your actual OpenAI API key
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
    const apiUrl = 'https://api.openai.com/v1/embeddings';
  
    const requestData = {
      input: 'Your text string goes here',
      model: 'text-embedding-ada-002',
    };
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response:', data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
