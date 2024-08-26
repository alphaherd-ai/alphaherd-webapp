import jsPDF from "jspdf";
import formatDateAndTime from "./formateDateTime";
import { BlobServiceClient } from "@azure/storage-blob";


export async function generatePdfForInvoiceAndUpload(data: any, appState: any, items: any): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(JSON.stringify(data));
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    function addText(text: any, x: any, y: any, fontSize = 10, align = 'left', weight = "regular") {
      y = checkPageBreak(doc, y, pageHeight, 0);
      if (weight !== "regular") {
        doc.setFontSize(fontSize);
      } else doc.setFontSize(fontSize);
      doc.text(text, x, y, { align: "left" });
      return y;
    }

    function checkPageBreak(doc: any, y: any, pageHeight: any, margin: any) {
      if (y > pageHeight - margin) {
        doc.addPage();
        return 10; // Reset y to the top margin
      }
      return y;
    }

    function addRow(data: any, y: any, columnPositions: any, rowHeight = 7) {
      y = checkPageBreak(doc, y, pageHeight, 0);
      data.forEach((text: any, index: any) => {
        addText(text, columnPositions[index], y);
      });
      return y + rowHeight;
    }

    function addLine(startX: any, startY: any, endX: any, endY: any) {
      startY = checkPageBreak(doc, startY, pageHeight, 0);
      endY = checkPageBreak(doc, endY, pageHeight, 0);
      doc.line(startX, startY, endX, endY);
    }

    const pageHeight = doc.internal.pageSize.height;
    let y = 10;
    const lineHeight = 6;

    // Fetch image from URL and add to PDF
    const getImageFromUrl = (url: string, callback: any) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx!.drawImage(img, 0, 0);
        const dataUrl = canvas.toDataURL('image/jpeg');
        callback(dataUrl);
      };
      img.src = url;
    };

    getImageFromUrl(appState.currentOrg.orgImgUrl, async (base64Image: string) => {
      doc.addImage(base64Image, 'JPEG', 10, 0.5, 40, 38);

      // Add header
      addText(appState.currentBranch?.org.orgName!, 55, y, 20, 'center', 'bold');
      y += 8;
      addText(`${appState.currentBranch?.branchName}`, 55, y, 11, 'center');
      y += 5;
      addText(`${appState.currentBranch?.org?.phoneNo!}`, 55, y, 11, 'center');
      y += 5;
      addText(`${appState.currentBranch?.org?.orgEmail!}`, 55, y, 11, 'center');
      y += 5;
      addText("petsfirsthospital.in", 55, y, 11, 'center');

      y += lineHeight;

      // Add line below header
      addLine(10, y, 200, y);
      y += lineHeight;

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0');
      let yyyy = today.getFullYear();
      let todayString = mm + '/' + dd + '/' + yyyy;

      // Add transaction details
      addText('Transaction details', 10, y, 12);
      y += 5;
      y = addRow(['Subject: Sale', 'Mode: Cash'], y, [10, 110]);
      y = addRow([`Amount Received: ${data.totalCost}`, 'Balance due: 0'], y, [10, 110]);
      y = addRow([`Date: ${todayString}`, `Receipt No.: ${data.invoiceNo}`], y, [10, 110]);

      // Add line below transaction details
      addLine(10, y, 200, y);
      y += lineHeight;

      today = new Date();
      dd = String(today.getDate()).padStart(2, '0');
      mm = String(today.getMonth() + 1).padStart(2, '0');
      yyyy = today.getFullYear();
      todayString = mm + '/' + dd + '/' + yyyy;

      // Add sales invoice details
      addText('Invoice details', 10, y, 12);
      y += 5;
      y = addRow([`Invoice No.: ${data.invoiceNo}`, `Date: ${todayString}`], y, [10, 110]);
      y = addRow([`Billed to: ${data.customer}`, `Phone No.: ${data.contact}`], y, [10, 110]);
      y = addRow([`Pay by: ${todayString}`, `Last date of return: ${formatDateAndTime(data.dueDate).formattedDate}`], y, [10, 110]);
      y = addRow([`Notes: ${data.notes}`], y, [10]);

      // Add line below sales invoice details
      addLine(10, y + 1, 200, y + 1);
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
      const rows = items.map((item: any, idx: any) => [String(idx + 1), item.name, String(item.quantity), String(item.sellingPrice), String(item.sellingPrice * item.quantity)]);

      rows.forEach((row: any) => {
        y = addRow(row, y, [10, 30, 110, 130, 160]);
        y = checkPageBreak(doc, y, pageHeight, 20);
      });

      addLine(10, y, 200, y);
      y += lineHeight;

      // Add summary headers and values
      y = addRow(['Subtotal', `${(items.reduce((acc: any, item: any) => acc + item.quantity * item.sellingPrice, 0) || 0).toFixed(2)}`], y, [130, 180]);
      addLine(200, y, 130, y);
      y += lineHeight;
      const summaryHeaders = ['Taxable Value', 'Tax Rate', 'Tax Amount'];
      const summaryValues = items.map((item: any) => [String(item.quantity * item.sellingPrice), String(`${item.taxAmount * 100}%`), String((item.taxAmount * item.quantity * item.sellingPrice).toFixed(2))]);
      y += lineHeight;
      addLine(200, y + 2, 100, y + 2);
      y = addRow(summaryHeaders, y, [100, 130, 160], lineHeight);
      summaryValues.forEach((values: any) => {
        y = addRow(values, y, [100, 130, 160], lineHeight);
        addLine(200, y, 100, y);
        y += lineHeight;
      });
      addLine(200, y + 2, 130, y + 2);
      y = addRow(['Shipping', `${data.shipping}`], y, [130, 160]);
      addLine(200, y + 2, 130, y + 2);
      y = addRow(['Total Discounts', `${data.overallDiscount}`], y, [130, 160]);

      addText('Grand Total', 130, y, 12);
      addText(`${(data.subTotal).toFixed(2)}`, 160, y, 12);

      y += lineHeight;

      // Add line below summary
      addLine(10, y, 200, y);

      // Get PDF as Blob
      const pdfBlob = doc.output('blob');

      // Upload PDF to Azure Blob Storage
      uploadToAzureBlob(pdfBlob, `invoice-${data.invoiceNo}.pdf`)
        .then((pdfUrl) => {
          resolve(pdfUrl);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}
// Upload PDF to Azure Blob Storage
async function uploadToAzureBlob(pdfBlob: Blob, fileName: string): Promise<string> {
    const blobUrl = "https://alphaherdblob.blob.core.windows.net";
    const sasToken = "sv=2022-11-02&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2024-08-30T23:13:46Z&st=2024-08-09T15:13:46Z&spr=https&sig=l%2FKJ71H75ygG2V833tp9w%2FU64PWNbdeuLgJc%2FKse0%2Fo%3D";
  
    const containerName = "alphaherd-blob-storage";
  
    // Create the BlobServiceClient with the SAS URL
    const blobServiceClient = new BlobServiceClient(`${blobUrl}?${sasToken}`);
    const containerClient = blobServiceClient.getContainerClient(containerName);

  
    // Create a unique name for the blob
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
  
    // Upload the blob
    await blockBlobClient.uploadData(pdfBlob, {
      blobHTTPHeaders: { blobContentType: "application/pdf" }
    });
    console.log(blockBlobClient.url)
    console.log(`PDF uploaded to Azure Blob Storage as ${fileName}`);
    const pdfUrl= blockBlobClient.url;
    return pdfUrl;

  }
