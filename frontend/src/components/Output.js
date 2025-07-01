import React from 'react';
import jsPDF from 'jspdf';

function Output() {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Output Data", 10, 10);
    doc.save("output.pdf");
  };

  return (
    <div>
      <h1>Output</h1>
      <button onClick={exportPDF}>Export to PDF</button>
      {/* Add logic to display output data */}
    </div>
  );
}

export default Output;
