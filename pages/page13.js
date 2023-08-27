

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import Link from 'next/link';
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PDFDownloadLink } from '@react-pdf/renderer'; // <-- Add this import
import PDFDocument from './components/PDFDocuments'

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isPageRefreshed, setIsPageRefreshed] = useState(false); // New state variable for tracking page refresh
  const [fetchedData, setFetchedData] = useState([]);


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


    } catch (error) {
      console.error(error);
      setIsFetching(false);
    }
  };


 
  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await fetch('./api/mongget');
        const data = await response.json();
        setFetchedData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDashboardData();
  }, []);

  // Function to insert two line breaks before the last line
  function insertDoubleLineBreakBeforeLastLine(text) {
    const lines = text.split('.');
    const lastLine = lines.pop();
    return lines.join('.') + '.<br /><br />' + lastLine;
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
          <h2></h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
          <PDFDownloadLink document={<PDFDocument result={result} />} fileName="nextjs-homepage.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Generating PDF...' : 'Download PDF'
            }
          </PDFDownloadLink>
        </div>
      )}

<form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('forminput1')} placeholder="Input 1" />
        <button type="submit" disabled={isFetching}>
          {isFetching ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      <div className="bg-black text-white text-3xl">
        {fetchedData.length >= 4 && (
          <div
            dangerouslySetInnerHTML={{
              __html: insertDoubleLineBreakBeforeLastLine(fetchedData[3].result),
            }}
          />
        )}
      </div>



    </div>
  );
}


