import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {


  var doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
});

var pageHeight = doc.internal.pageSize.height;
let y = 10;
let lineHeight = 6;

// http://localhost:3000/alphaherd/api/finance/invoice

function addText(text, x, y, fontSize = 10, align = 'left', weight = "regular"){
    y = checkPageBreak(doc, y, pageHeight);
    if(weight!=="regular"){
      doc.setFontSize(fontSize,weight);
    }
    else doc.setFontSize(fontSize);
    doc.text(text, x, y, { align: align });
    return y;
};

function checkPageBreak(doc, y, pageHeight, margin){
    if (y > pageHeight - margin) {
        doc.addPage();
        return 10; // Reset y to the top margin
    }
    return y;
};

function addRow(data, y, columnPositions, rowHeight = 7){
    y = checkPageBreak(doc, y, pageHeight);
    data.forEach((text, index) => {
        addText(text, columnPositions[index], y);
    });
    return y + rowHeight;
};

function addLine(startX, startY, endX, endY){
    startY = checkPageBreak(doc, startY, pageHeight);
    endY = checkPageBreak(doc, endY, pageHeight);
    doc.line(startX, startY, endX, endY);
};

// Add header
addText('Pet First 24/7 Hospital', 105, y, 20, 'center','bold');
y += 8;
addText('416, 1st Cross, 5th Colony, HAL 3rd Stage, New Tippasandra, Bangalore-560075', 105, y, 11, 'center');
y += 5;
addText('+91 9834324324 · caravet@gmail.com · petsfirsthospital.in', 105, y, 11, 'center');

// Add logo
// Assuming the logo path is correct
// doc.addImage('/path/to/logo.png', 'PNG', 10, y - 20, 30, 30);

y += lineHeight;

// Add line below header
addLine(10, y, 200, y);
y += lineHeight;

// Add transaction details
addText('Transaction details', 10, y, 12);
y += 5;
y = addRow(['Subject: Sale', 'Mode: Cash'], y, [10, 110]);
y = addRow(['Amount Received: 2,624', 'Balance due: 0'], y, [10, 110]);
y = addRow(['Date: 21/12/2023', 'Receipt No.: RE00001'], y, [10, 110]);


// Add line below transaction details
addLine(10, y, 200, y);
y += lineHeight;

// Add sales invoice details
addText('Sales Invoice details', 10, y, 12);
y += 5;
y = addRow(['Invoice No.: SI-00001', 'Date: 21/12/2023'], y, [10, 110]);
y = addRow(['Billed to: Quentin Tarantino', 'Phone No.: +91 99999 99999'], y, [10, 110]);
y = addRow(['Pay by: 23/12/2023', 'Last date of return: 28/12/2023'], y, [10, 110]);
y = addRow(['Notes:'], y, [10]);


// Add line below sales invoice details
addLine(10, y, 200, y);
y += lineHeight;

// Add table headers
addText('No.', 10, y, 10);
addText('Product/Service', 30, y, 10);
addText('Qty.', 110, y, 10);
addText('Unit price', 130, y, 10);
addText('Amount', 160, y, 10);
y += 7;

y = checkPageBreak(doc, y, pageHeight, 20);

// Add table rows
const rows = [
    ['1', 'Metoclopramide', '5 strips', '400', '2,000'],
    ['2', 'General Consultation', '1', '500', '500'],
];
rows.forEach(row => {
    y = addRow(row, y, [10, 30, 110, 130, 160]);
    y = checkPageBreak(doc, y, pageHeight, 20);
});


addLine(10, y, 200, y);
y += lineHeight;

// Add summary
y = addRow(['Subtotal', '2,500'], y, [150, 180]);
y = addRow(['Taxable Value', '2,000'], y, [150, 180]);
y = addRow(['Tax Rate', '18% GST'], y, [150, 180]);
y = addRow(['Tax Amount', '360'], y, [150, 180]);
y = addRow(['Shipping', '0'], y, [150, 180]);
y = addRow(['Total Discounts', '-236'], y, [150, 180]);
addText('Grand Total', 150, y, 12);
addText('2,624', 180, y, 12);

  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {

    return new Response(doc.output('arraybuffer'), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="invoice.pdf"'
      },
    })
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify(error), { status: 500 });
  } finally {
    await prismaClient.$disconnect();
  }
};