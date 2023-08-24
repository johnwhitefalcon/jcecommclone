
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { useForm } from 'react-hook-form';

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState([]); // New state for fetched data

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
    // Fetch data from your API on component mount
    async function fetchDashboardData() {
      try {
        const response = await fetch('/api/mongget');
        const data = await response.json();
        setFetchedData(data); // Store the fetched data in state
      } catch (error) {
        console.error(error);
      }
    }
    fetchDashboardData();
  }, []);

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
          <div>
            {/* Render the result here */}
            {result}
          </div>
        </div>
      )}

      <div>
        {/* Render the fetched data here */}
        {fetchedData.map((item, index) => (
          <div key={index}>{item.result}</div>
        ))}
      </div>
    </div>
  );
}

