



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



    </div>
  );
}



