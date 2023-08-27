

import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { useForm } from 'react-hook-form';

export default function FormComponent() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchedData, setFetchedData] = useState([]); // New state for fetched data

  const onSubmit = async ({ forminput1 }) => {}

  // Function to insert a double-spaced line break before the last line
  function insertDoubleSpacedBreak(text) {
    const lines = text.split('\n');
    if (lines.length >= 2) {
      // Insert a double-spaced line break before the last line
      lines.splice(lines.length - 1, 0, ''); // Empty line for double spacing
    }
    return lines.join('\n');
  }

  useEffect(() => {
    // Fetch data from your API on component mount
    async function fetchDashboardData() {
      try {
        const response = await fetch('./api/mongget');
        const data = await response.json();
        setFetchedData(data.map(item => ({
          ...item,
          result: item.result.replace(/\./g, '.<br /><br />'),
        }))); // Store the fetched data in state with line breaks after full stops
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

      <div className="bg-black text-white text-3xl">
        {/* Render only the fourth item from the fetched data */}
        {fetchedData.length >= 4 && (
          <div
            dangerouslySetInnerHTML={{
              __html: insertDoubleSpacedBreak(fetchedData[3].result),
            }}
          />
        )}
      </div>
    </div>
  );
}

