

import { readFile, writeFile } from 'fs/promises';

export default async (req, res) => {
  const decoder = new TextDecoder('utf-8');
  const filePath = 'C:/JCtest/testpdf.txt';

  try {
    // Reading file
    const data = await readFile(filePath, 'utf-8');
    console.log('Read data:', data);

    // Writing file
    const encoder = new TextEncoder();
    const text = encoder.encode('winner writing this to the word doco');
    await writeFile(filePath, text);

    res.status(200).json({ message: 'File read and written successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

