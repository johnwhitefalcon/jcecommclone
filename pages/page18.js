



import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import Link from 'next/link';
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './components/PDFDocuments';

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isPageRefreshed, setIsPageRefreshed] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [one, two] = useState([]);



  const onSubmit = async ({ forminput1 }) => {
    try {
      setIsFetching(true);

      const response = await fetch('/api/gpt22', {
        method: 'POST',
        body: JSON.stringify({ prompt1: forminput1 }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data1 = await response.json();
      setResult(data1.result);
      setIsFetching(false);

      await submitToMongoDB(data1.result);
    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };

  const submitToMongoDB = async (result) => {
    try {
      const response1 = await fetch('./api/mongapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result }),
      });
      const resdata = await response1.json();
      // Handle the response if needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // First, post data to MongoDB
        await submitToMongoDB(result);

        // Then, fetch data from MongoDB
        const response = await fetch('./api/mongget');
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    // Call the fetchData function when the component mounts
    fetchData();
  }, [result]);

  const finfin = function insertDoubleLineBreakBeforeLastLine(text) {
    if (text) { // Add a null check
      const lines = text.split('.');
      const lastLine = lines.pop();
      const fin = lines.join('.') + '.<br /><br />' + lastLine;
      return fin
    } else {
      return ''; // Return an empty string if text is null
    }
  }

  const submitgenerateWord = async (finfin) => {
  const response = await fetch('./api/generateWord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(finfin), // Send user input data to the server
  });



    // Assuming the server responds with the Word document as a blob
    const blob = await response.blob();

    // Create a download link for the generated Word document
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my_document.docx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

}

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('forminput1')} placeholder="Input 1" />
        <button type="submit" disabled={isFetching}>
          {isFetching ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {result && (
        <div className="">
          

      <div className="bg-black text-white text-3xl">
        {fetchedData.length >= 4 && (
          <div
            dangerouslySetInnerHTML={{
              __html: finfin(fetchedData[fetchedData.length - 1].result),
            }}
          />
        )}
      </div>


 
        </div>
      )}


    </div>
  );
}



