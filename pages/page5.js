
import { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';

const HomePage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [textToAdd, setTextToAdd] = useState('');
  const [pdfResult, setPdfResult] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setPdfFile(selectedFile);
  };

  const handleTextChange = (event) => {
    setTextToAdd(event.target.value);
  };

  const addTextToPdf = async () => {
    if (!pdfFile) return;

    const pdfData = await pdfFile.arrayBuffer();
    const pdfDoc = await PDFDocument.load(pdfData);
    const page = pdfDoc.getPage(0); // Assuming you want to add text to the first page
    const fontSize = 20;
    const { width, height } = page.getSize();

    page.drawText(textToAdd, {
      x: 50,
      y: height - 50,
      size: fontSize,
      color: rgb(0, 0, 0),
    });

    const modifiedPdfBytes = await pdfDoc.save();

    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    setPdfResult(url);
  };

  return (
    <div>
      <h1>PDF Text Addition</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <textarea
        placeholder="Enter text to add to PDF"
        value={textToAdd}
        onChange={handleTextChange}
      />
      <button onClick={addTextToPdf}>Add Text to PDF</button>
      {pdfResult && <iframe src={pdfResult} width="100%" height="500px" />}
    </div>
  );
};

export default HomePage;

