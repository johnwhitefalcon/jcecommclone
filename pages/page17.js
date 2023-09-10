
import React from 'react';
import { useForm } from 'react-hook-form';

function MyComponent() {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    // Make a POST request to your serverless function to generate the Word document
    const response = await fetch('./api/generateWord', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Send user input data to the server
    });

    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      return;
    }

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
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input {...register('title')} type="text" />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea {...register('content')} />
        </div>
        <button type="submit">Generate Word Document</button>
      </form>
    </div>
  );
}

export default MyComponent;

