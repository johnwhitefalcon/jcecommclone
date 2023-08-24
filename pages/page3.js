
import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';


const Home = () => {
  const [pdfBytes, setPdfBytes] = useState(null);

  const formatAndSavePdf = async () => {
    try {
      // Load the existing PDF
      const pdfPath = 'C/JCTest/home.pdf'; // Update the path to your test.pdf
      const existingPdfBytes = await fs.readFile(pdfPath);

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();

      // Iterate through each page and insert a space between each line of text
      pages.forEach((page) => {
        const textLines = page.getText().split('\n');
        const newText = textLines.join('\n\n'); // Insert a space between each line
        page.drawText(newText, { x: 50, y: 500, size: 12 });
      });

      // Serialize the modified PDFDocument to bytes
      const modifiedPdfBytes = await pdfDoc.save();

      // Update the state with the modified PDF bytes
      setPdfBytes(modifiedPdfBytes);

      // Write the modified PDF bytes back to the file
      await fs.writeFile(pdfPath, modifiedPdfBytes);
    } catch (error) {
      console.error('Error formatting PDF:', error);
    }
  };

  const downloadPdf = async () => {
    if (pdfBytes) {
      try {
        const pdfPath = 'C/JCTest/home.pdf'; // Update the path for saving the formatted PDF
        await fs.writeFile(pdfPath, pdfBytes);

        console.log('Formatted PDF saved:', pdfPath);
      } catch (error) {
        console.error('Error saving formatted PDF:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={formatAndSavePdf}>Format and Save PDF</button>
      <button onClick={downloadPdf}>Download Formatted PDF</button>
    </div>
  );
};

export default Home;

