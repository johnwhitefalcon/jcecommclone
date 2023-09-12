

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
      setIsFetching(false);
    }
  };

  const submitToMongoDB = async () => {
    try {
      if (result !== null) { // Check if result is not null before submitting
        const response1 = await fetch('./api/mongapi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ result }),
        });
        const resdata = await response1.json();

        // Handle the response if needed
      }
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // First, post data to MongoDB if result is not null
        if (result !== null) {
          await submitToMongoDB();
        }

        // Then, fetch data from MongoDB
        const response = await fetch('./api/mongget');
        const data = await response.json();
        setFetchedData(data);

        // Process the data
        const two = [];
        const three = [];
        const one = data.map(function(item){
            two.push(item.result)
        })

        var leng = two.length-1
       
        
        var cut = two.splice(leng,1);
        for(var i=0; i<two.length; i++){
          // Do something with the data
        }
        
        three.push(cut);
        console.log(three);
        
      } catch (error) {
        console.error(error);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  }, [result]);

  // Function to insert double line breaks before the last line
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

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('forminput1')} placeholder="Input 1" />
        <button type="submit" disabled={isFetching}>
          {isFetching ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {fetchedData && (
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

