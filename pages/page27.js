




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
  const [aa, seta] = useState();


  const onSubmit = async ({ forminput1, forminput2, forminput3, forminput4, forminput5 }) => {
    try {
      setIsFetching(true);

      const response = await fetch('/api/gpt23', {
        method: 'POST',
        body: JSON.stringify({ 
          prompt1: forminput1,
          prompt2: forminput2,
          prompt3: forminput3,
          prompt4: forminput4,
          prompt5: forminput5,
         }),
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

var five = {text1: ''}

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

        var four = three[0].toString()

      //  seta({ text1: four })

      five.text1 = four

  
        submitgenerateWord()

       

        
      } catch (error) {
        console.error(error);
      }
    }

    // Call the fetchData function when the component mounts
    fetchData();
  

  }, [result]);

  // Function to insert double line breaks before the last line
  const finfin = function insertDoubleLineBreakBeforeLastLine(text1) {
    if (text1) { // Add a null check
      const lines = text1.split('.');
      const lastLine = lines.pop();
      const fin = lines.join('.') + '.<br /><br />' + lastLine;
      return fin
    } else {
      return ''; // Return an empty string if text is null
    }
  }

var six = five



  console.log(six)

  async function submitgenerateWord() {
    const response11 = await fetch('./api/generateWord1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(six), // Send user input data to the server
    });
  
  
  
      // Assuming the server responds with the Word document as a blob
      const blob = await response11.blob();
  
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
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">

<div className="text-6xl fixed z-10 ml-[25rem] mt-[-40rem] w-[80rem]">
        Disciplinary Invitation
      </div>

      <div className="text-3xl fixed z-10 ml-[-80rem] mt-[-25rem] w-[20rem] scale-y-150 bg-black inline-block">
        <img src="https://images.unsplash.com/photo-1556752462-c1135dd7b570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHdhdGVyJTIwZHJvcGxldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60" />
   
       </div>



       <div className="text-2xl fixed z-10 ml-[45rem] mt-[-25rem] w-[100rem]" >
      <form>

        <div className="text-2xl fixed z-10 ml-[0rem] mt-[0rem] w-[100rem]">
        <input {...register('forminput1')} placeholder="Employee Name" className="text-black"/>
        </div>

      
       <div className="text-2xl fixed z-10 ml-[0rem] mt-[5rem] w-[100rem]">
        <input {...register('forminput2')} placeholder="Disciplinary Issue" className="text-black"/>
        </div>


        <div className="text-2xl fixed z-10 ml-[0rem] mt-[10rem] w-[100rem]">
        <input {...register('forminput3')} placeholder="Meeting Time" className="text-black"/>
        </div>


        <div className="text-2xl fixed z-10 ml-[0rem] mt-[15rem] w-[100rem]">
        <input {...register('forminput4')} placeholder="Meeting Date" className="text-black"/>
        </div>


        <div className="text-2xl fixed z-10 ml-[0rem] mt-[20rem] w-[100rem]">
        <input {...register('forminput5')} placeholder="Meeting Location" className="text-black"/>
        </div>


        <div className="text-2xl fixed z-10 ml-[0rem] mt-[25rem] w-[100rem]">
        <input {...register('forminput6')} placeholder="Manager Name" className="text-black"/>
        </div>

      </form>

<div className="text-6xl fixed z-10 ml-[30rem] mt-[7rem] w-[20rem] bg-gray-500 py-4 px-4">
        <button onClick={handleSubmit(onSubmit)} type="submit" disabled={isFetching}>
          {isFetching ? 'Submitting...' : 'Submit'}
        </button> 
</div>

      </div> 




      {fetchedData && (
        <div className="">
          <div className="text-2xl fixed z-10 ml-[25rem] mt-[-35rem] w-[80rem]">
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






