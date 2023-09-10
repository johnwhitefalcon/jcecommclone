
import officegen from 'officegen';
import fs from 'fs';
import path from 'path';

export default (req, res) => {

  if (req.method === 'POST') {   
  // Create a new Word document
  const docx = officegen('docx');
  
  
  
  // Create a new paragraph and add text to it
  const paragraph = docx.createP();
  paragraph.addText(req.body.content, { bold: true });
  
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
