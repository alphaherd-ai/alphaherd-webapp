// import { NextRequest, NextResponse } from 'next/server';
// import { BlobServiceClient } from '@azure/storage-blob';
// import PDFDocument from 'pdfkit';
// import { v4 as uuidv4 } from 'uuid';
// import { Buffer } from 'buffer';

// const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING as string);
// const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME as string);

// const uploadPdfToAzure = async (pdfBuffer: Buffer) => {
//   const blobName = `${uuidv4()}.pdf`;
//   const blockBlobClient = containerClient.getBlockBlobClient(blobName);
//   await blockBlobClient.upload(pdfBuffer, pdfBuffer.length);
//   return blockBlobClient.url;
// };

// const generatePdfForInvoice = async (data: any, appState: any, items: any): Promise<Buffer> => {
//   return new Promise<Buffer>((resolve, reject) => {
//     const doc = new PDFDocument();
//     const buffers: Buffer[] = [];

//     doc.on('data', buffers.push.bind(buffers));
//     doc.on('end', () => {
//       const pdfBuffer = Buffer.concat(buffers);
//       resolve(pdfBuffer);
//     });

//     // Add your PDF content here
//     doc.text(`Customer: ${data.customer}`);
//     doc.text(`Invoice No: ${data.invoiceNo}`);
//     // Add more content as needed

//     doc.end();
//   });
// };

// export const POST = async (req: NextRequest) => {
//   try {
//     const { headerData, tableData, totalAmountData, type, appState } = await req.json();

//     let totalQty = 0;
//     tableData.forEach((data: { quantity: any; }) => {
//       totalQty += data.quantity || 0;
//     });

//     const items = tableData.map((data: { productId: any; id: any; quantity: any; sellingPrice: any; gst: any; itemName: any; discount: any; }) => ({
//       productId: data.productId,
//       productBatchId: data.id,
//       quantity: data.quantity,
//       sellingPrice: data.sellingPrice,
//       taxAmount: data.gst,
//       name: data.itemName,
//       discount: data.discount,
//     }));

//     const data = {
//       customer: headerData.customer.value.clientName,
//       notes: headerData.notes,
//       subTotal: totalAmountData.subTotal,
//       invoiceNo: headerData.invoiceNo,
//       dueDate: headerData.dueDate,
//       shipping: totalAmountData.shipping,
//       adjustment: totalAmountData.adjustment,
//       totalCost: totalAmountData.totalCost,
//       contact: headerData.customer.value.contact,
//       overallDiscount: `${totalAmountData.gst * 100}%`,
//       totalQty: totalQty,
//       status: 'Pending',
//       type: type, // Use the input type here
//       items: {
//         create: items,
//       },
//     };

//     const pdfBuffer = await generatePdfForInvoice(data, appState, items);
//     const pdfUrl = await uploadPdfToAzure(pdfBuffer);

//     return NextResponse.json({ pdfUrl }, { status: 200 });
//   } catch (error) {
//     console.error('Error generating PDF and uploading to Azure:', error);
//     return NextResponse.json({ message: 'Error generating PDF and uploading' }, { status: 500 });
//   }
// };

// 

import { NextRequest, NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import PDFDocument from 'pdfkit';
import { v4 as uuidv4 } from 'uuid';
import { Buffer } from 'buffer';

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING as string);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME as string);

const uploadPdfToAzure = async (pdfBuffer: Buffer) => {
  try {
    const blobName = `${uuidv4()}.pdf`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(pdfBuffer, pdfBuffer.length);
    console.log('PDF uploaded successfully');
    return blockBlobClient.url;
  } catch (error) {
    console.error('Error uploading PDF to Azure:', error);
    throw new Error('Error uploading PDF to Azure');
  }
};

const generatePdfForInvoice = async (data: any, appState: any, items: any): Promise<Buffer> => {
  return new Promise<Buffer>((resolve, reject) => {
    const doc = new PDFDocument();
    const buffers: Buffer[] = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfBuffer = Buffer.concat(buffers);
      resolve(pdfBuffer);
    });

    doc.on('error', (err) => {
      console.error('Error generating PDF:', err);
      reject(err);
    });

    // Add your PDF content here
    doc.text(`Customer: ${data.customer}`);
    doc.text(`Invoice No: ${data.invoiceNo}`);
    // Add more content as needed

    doc.end();
  });
};

export const POST = async (req: NextRequest) => {
  try {
    console.log('Received request');
    const { headerData, tableData, totalAmountData, type, appState } = await req.json();
    console.log('Request data:', { headerData, tableData, totalAmountData, type, appState });

    let totalQty = 0;
    tableData.forEach((data: { quantity: any; }) => {
      totalQty += data.quantity || 0;
    });

    const items = tableData.map((data: { productId: any; id: any; quantity: any; sellingPrice: any; gst: any; itemName: any; discount: any; }) => ({
      productId: data.productId,
      productBatchId: data.id,
      quantity: data.quantity,
      sellingPrice: data.sellingPrice,
      taxAmount: data.gst,
      name: data.itemName,
      discount: data.discount,
    }));

    const data = {
      customer: headerData.customer.value.clientName,
      notes: headerData.notes,
      subTotal: totalAmountData.subTotal,
      invoiceNo: headerData.invoiceNo,
      dueDate: headerData.dueDate,
      shipping: totalAmountData.shipping,
      adjustment: totalAmountData.adjustment,
      totalCost: totalAmountData.totalCost,
      contact: headerData.customer.value.contact,
      overallDiscount: `${totalAmountData.gst * 100}%`,
      totalQty: totalQty,
      status: 'Pending',
      type: type,
      items: {
        create: items,
      },
    };

    console.log('Generating PDF with data:', data);
    const pdfBuffer = await generatePdfForInvoice(data, appState, items);
    console.log('PDF generated successfully');
    console.log('Uploading PDF to Azure');
    const pdfUrl = await uploadPdfToAzure(pdfBuffer);
    console.log('PDF uploaded successfully, URL:', pdfUrl);

    return NextResponse.json({ pdfUrl }, { status: 200 });
  } catch (error) {
    console.error('Error generating PDF and uploading to Azure:', error);
    return NextResponse.json({ message: 'Error generating PDF and uploading' }, { status: 500 });
  }
};
