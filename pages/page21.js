





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

      await submitToMongoDB(result);
      
    } catch (error) {
      
      setIsFetching(false);
    }
  };

  const submitToMongoDB = async () => {
    try {
      const response1 = await fetch('./api/mongapi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ result }),
      });
      const resdata = await response1.json();

      // Handle the response if needed
    } catch (error) {
      
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
        console.log('=============================================')
        const one = [];
        const four = [];
        const two = data.map(function(item){
            one.push(item[i].result)
        })

        for(i=0; i<one.length; i++){
            const three = two.slice(one[1])
        }

        console.log(three)
        await submitgenerateWord(fetchedData)
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


