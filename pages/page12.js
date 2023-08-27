

import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { useForm } from 'react-hook-form';

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const onSubmit = async ({ forminput1 }) => {};

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

