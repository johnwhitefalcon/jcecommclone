

import officegen from 'officegen';
import { createWriteStream } from 'fs';

export default async (req, res) => {
  const filePath = 'C:/JCtest/templatedoc.docx';

  try {
    // Creating a Word document
    const docx = officegen('docx');

    // Adding a heading to the document
    const heading = docx.createP();
    heading.addText('Document Heading', { font_face: 'Arial', bold: true, font_size: 16 });

    // Adding some initial content or placeholders
    const initialContent = docx.createP();
    initialContent.addText('Initial Content', { font_face: 'Arial', font_size: 12 });

    // Insert your specific content after the heading
    const insertedContent = docx.createP();
    insertedContent.addText('Inserted Content', { font_face: 'Arial', font_size: 12 });

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

