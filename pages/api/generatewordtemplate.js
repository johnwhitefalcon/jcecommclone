

import officegen from 'officegen';
import { createWriteStream } from 'fs';

export default async (req, res) => {
  const filePath = 'C:/JCtest/templatedoc.docx';

  try {
    // Creating a Word document
    const docx = officegen('docx');
    
    // Adding a paragraph to the document
    const pObj = docx.createP();
    pObj.addText('Modified content');

    // Creating a write stream to the Word document file
    const stream = createWriteStream(filePath);

    // Pipe the document to the write stream
    docx.generate(stream);

    // Respond to the client
    res.status(200).json({ message: 'Word document modified and written successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
};


