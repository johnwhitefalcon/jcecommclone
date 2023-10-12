

import officegen from 'officegen';
import fs from 'fs';
import path from 'path';

export default (req, res) => {
  if (req.method === 'POST') {
    // Create a new Word document
    const docx = officegen('docx');

    // Add a bold header
    const header = docx.createP();
    header.addText('RE DISCIPLINARY', { bold: true });

    // Split the text into sentences
    const sentences = req.body.text1.split('. ');

    // Add each sentence as a paragraph with a line space in between
    sentences.forEach((sentence) => {
      const body = docx.createP();
      body.addText(sentence);
      
      // Add a line space
      docx.createP();
    });

    // Generate a unique filename for the Word document
    const filePath = path.join(__dirname, 'my_document.docx');

    // Pipe the document to a file stream
    const outputStream = fs.createWriteStream(filePath);
    docx.generate(outputStream);

    // Close the document
    outputStream.on('finish', () => {
      // Send the generated document as a response
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', 'attachment; filename=my_document.docx');
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    });
  }
};
