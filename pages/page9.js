
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { useForm } from 'react-hook-form';

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState([]); // New state for fetched data

  const onSubmit = async ({ forminput1 }) => {}

  useEffect(() => {
    // Fetch data from your API on component mount
    async function fetchDashboardData() {
      try {
        const response = await fetch('./api/mongget');
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

      <div>
        {/* Render only the fourth item from the fetched data */}
        {fetchedData.length >= 4 && (
          <div>{fetchedData[3].result}</div>
        )    }
      </div>
    </div>
  );
}


