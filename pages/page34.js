



import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button, Input } from 'antd';
import Link from 'next/link';
import Head from "next/head";
import { useForm } from "react-hook-form";
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Page, Document, Text, View } from '@react-pdf/renderer';

// import PDFDocument from './components/PDFDocuments';

export default function FormComponent() {
  


    const fs = require('fs');

    const updateFile = () => {
      const filePath = './JCtest/testpdf.txt'; // Replace with the actual path to your file
    
      // New content to be inserted
      const newContent = 'hello johnny';
    
      // Read the file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }
    
        // Concatenate the new content
        const updatedContent = data + '\n' + newContent;
    
        // Write the updated content back to the file
        fs.writeFile(filePath, updatedContent, 'utf8', (err) => {
          if (err) {
            console.error('Error writing to file:', err);
            return;
          }
    
          console.log('File updated successfully!');
        });
      });
    };
    
    // Run the function
    updateFile();
    




  

  return (
    <div className="text-white font-extrabold h-screen justify-center items-center bg-black flex">
      






        </div>

  );
}


