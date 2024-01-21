
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function getVectorEmbedding(word) {
  try {
    const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: `Embed the word "${word}" as a vector.`,
        max_tokens: 1,
      }),
    });

    const data = await response.json();

    return data.choices[0]?.text.trim();
  } catch (error) {
    console.error('Error fetching vector embedding from OpenAI:', error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  // This file remains the same as before
}