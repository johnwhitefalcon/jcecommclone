
import React from 'react';
import { Page, Document, Text, View } from '@react-pdf/renderer';

const PDFDocument = ({ result }) => {
  return (
    <Document>
      <Page size="A4" style={{ backgroundColor: 'black', paddingTop: 40, paddingHorizontal: 40 }}>
        <View style={{ color: 'white' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Subject: Disciplinary Meeting
            {'\n\n'}{/* Adding space */}
          </Text>
          {result && (
            <Text style={{ fontSize: 12 }}>
 {JSON.stringify(result, null, 2).replace(/^"|"$/g, '')}

            </Text>

          )}

<Text style={{ fontSize: 12, fontWeight: 'bold' }}>
            Regards
            {'\n\n'}{/* Adding space */}
            John
          </Text>

        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
