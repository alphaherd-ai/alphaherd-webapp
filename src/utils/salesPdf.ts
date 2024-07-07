import jsPDF from "jspdf";
import formatDateAndTime from "./formateDateTime";

export function generatePdfForInvoice(data: any, appState: any, items: any) {
  console.log(JSON.stringify(data))
  var doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  function addText(text:any, x:any, y:any, fontSize = 10, align = 'left', weight = "regular") {
    y = checkPageBreak(doc, y, pageHeight,0);
    if (weight !== "regular") {
      doc.setFontSize(fontSize);
    }
    else doc.setFontSize(fontSize);
    doc.text(text, x, y, { align: "left" });
    return y;
  };
  
  function checkPageBreak(doc:any, y:any, pageHeight:any, margin:any) {
    if (y > pageHeight - margin) {
      doc.addPage();
      return 10; // Reset y to the top margin
    }
    return y;
  };
  
  function addRow(data:any, y:any, columnPositions:any, rowHeight = 7) {
    y = checkPageBreak(doc, y, pageHeight,0);
    data.forEach((text:any, index:any) => {
      addText(text, columnPositions[index], y);
    });
    return y + rowHeight;
  };
  
  function addLine(startX:any, startY:any, endX:any, endY:any) {
    startY = checkPageBreak(doc, startY, pageHeight,0);
    endY = checkPageBreak(doc, endY, pageHeight,0);
    doc.line(startX, startY, endX, endY);
  };

  var pageHeight = doc.internal.pageSize.height;
  let y = 10;
  let lineHeight = 6;

  // Add header
  addText(appState.currentBranch?.org.orgName!, 70, y, 20, 'center', 'bold');
  y += 8;
  addText(`${appState.currentBranch?.branchName}`, 70, y, 11, 'center');
  y += 5;
  addText(`${appState.currentBranch?.org?.phoneNo!} · ${appState.currentBranch?.org?.orgEmail!}· petsfirsthospital.in`, 70, y, 11, 'center');

  // doc.setFontSize(20)
  // doc.text(appState.currentBranch?.org.orgName!, 65, 6);
  // doc.setFontSize(14)
  // doc.text(`${appState.currentBranch?.branchName}`, 65, 14, { maxWidth: 100 });
  // doc.setLineWidth(0.3);
  // doc.line(0, 30, 420, 30);

  y += lineHeight;

  // Add line below header
  addLine(10, y, 200, y);
  y += lineHeight;

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  var todayString = mm + '/' + dd + '/' + yyyy;

  // Add transaction details
  addText('Transaction details', 10, y, 12);
  y += 5;
  y = addRow(['Subject: Sale', 'Mode: Cash'], y, [10, 110]);
  y = addRow([`Amount Received: ${data.totalCost}`, 'Balance due: 0'], y, [10, 110]);
  y = addRow([`Date: ${todayString}`, `Receipt No.: ${data.invoiceNo}`], y, [10, 110]);


  // Add line below transaction details
  addLine(10, y, 200, y);
  y += lineHeight;

  // doc.setFontSize(20)
  // doc.text("Transaction details", 20, 40);
  // doc.setFontSize(16)
  // doc.text("Subject: Sale", 20, 50);
  // doc.text("Mode: Cash", 100, 50);
  // doc.text(`Amount Received: ${data.totalCost}`, 180, 50);

  // var today = new Date();
  // var dd = String(today.getDate()).padStart(2, '0');
  // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // var yyyy = today.getFullYear();
  // var todayString = mm + '/' + dd + '/' + yyyy;

  // doc.text(`Date: ${todayString}`, 20, 60);
  // doc.text(`Receipt No.: ${data.invoiceNo}`, 100, 60);
  // doc.text("Balance due: 0", 180, 60);
  // doc.setLineWidth(0.3);
  // doc.line(0, 65, 420, 65);

  today = new Date();
  dd = String(today.getDate()).padStart(2, '0');
  mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  yyyy = today.getFullYear();
  todayString = mm + '/' + dd + '/' + yyyy;

  // Add sales invoice details
  addText('Invoice details', 10, y, 12);
  y += 5;
  y = addRow([`Invoice No.: ${data.invoiceNo}`, `Date: ${todayString}`], y, [10, 110]);
  y = addRow([`Billed to: ${data.customer}`, `Phone No.: ${data.contact}`], y, [10, 110]);
  y = addRow([`Pay by: ${todayString}`, `Last date of return: ${formatDateAndTime(data.dueDate).formattedDate}`], y, [10, 110]);
  y = addRow([`Notes: ${data.notes}`], y, [10]);

  // doc.setFontSize(20)
  // doc.text("Sales Invoice details", 20, 75);
  // doc.setFontSize(16)
  // doc.text(`Invoice No.: ${data.invoiceNo}`, 20, 85);
  // doc.text(`Date: ${todayString}`, 100, 85);
  // doc.text(`Billed to: ${data.customer}`, 20, 95);
  // doc.text("Phone No.: +91 99999 99999", 100, 95);


  // today = new Date(data.dueDate);
  // dd = String(today.getDate()).padStart(2, '0');
  // mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  // yyyy = today.getFullYear();
  // todayString = mm + '/' + dd + '/' + yyyy;

  // doc.text(`Pay by: ${todayString}`, 20, 105);
  // doc.text(`Last date of return: ${todayString}`, 100, 105);
  // doc.text(`Notes: ${data.notes}`, 20, 115);  

  // Add line below sales invoice details
  addLine(10, y+1, 200, y+1);
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
  // const rows = [
  //     ['1', 'Metoclopramide', '5 strips', '400', '2,000'],
  //     ['2', 'General Consultation', '1', '500', '500'],
  // ];

  const rows = items.map((item:any, idx:any) => [String(idx + 1), item.name, String(item.quantity), String(item.sellingPrice),String(item.sellingPrice*item.quantity)]);

  rows.forEach((row:any) => {
    y = addRow(row, y, [10, 30, 110, 130, 160]);
    y = checkPageBreak(doc, y, pageHeight, 20);
  });


  addLine(10, y, 200, y);
  y += lineHeight;

  // doc.setFontSize(16)
  // doc.text("No.", 20, 135);
  // doc.text("Product/Service", 60, 135);
  // doc.text("Qty.", 150, 135, { maxWidth: 40 });
  // doc.text("Unit price", 190, 135);
  // doc.setLineWidth(0.3);
  // doc.line(15, 140, 260, 140);

  // for (let i = 0; i < items.length; i++) {
  //   y += 15;
  //   doc.text(`${i+1}`, 20, y);
  //   doc.text(`${items[i].name}`, 60, y);
  //   doc.text(`${items[i].quantity}`, 150, y, { maxWidth: 40 });
  //   doc.text(`${items[i].sellingPrice}`, 190, y);
  //   if (y > 210) {
  //     y = 10;
  //     doc.addPage();
  //   }
  // }

  // y += 10;
  // if (y > 210) {
  //   y = 10;
  //   doc.addPage();
  // }

  // doc.setLineWidth(0.3);
  // doc.line(140, y, 260, y);

  // y += 10;
  // if (y > 210) {
  //   y = 10;
  //   doc.addPage();
  // }

  // Add summary
  // y = addRow(['Subtotal', `${data.totalCost}`], y, [150, 180]);
  // y = addRow(['Taxable Value', '2,000'], y, [150, 180]);
  // y = addRow(['Tax Rate', '18% GST'], y, [150, 180]);
  // y = addRow(['Tax Amount', '360'], y, [150, 180]);

  // Add summary headers and values
  
  y = addRow(['Subtotal', `${(items.reduce((acc:any, item:any) => acc + item.quantity *item.sellingPrice , 0)||0).toFixed(2)}`], y, [130, 180]);
  addLine(200, y, 130, y);
  y += lineHeight;
  const summaryHeaders = ['Taxable Value', 'Tax Rate', 'Tax Amount'];
  // const summaryValues = [
  //     ['₹2,000', '18% GST', '₹360'],
  //     ['₹500', '0%', '₹0']
  // ];

  const summaryValues = items.map((item:any) => [String(item.quantity * item.sellingPrice), String(`${item.taxAmount*100}%`), String((item.taxAmount*item.quantity * item.sellingPrice).toFixed(2))]); // Tax rate not getting for now...
  y+=lineHeight;
    addLine(200, y+2, 100, y+2);
  
  y = addRow(summaryHeaders, y, [100, 130, 160], lineHeight); 
  summaryValues.forEach((values:any) => {
    y = addRow(values, y, [100, 130, 160], lineHeight);
    addLine(200, y, 100, y);
    y+=lineHeight
  });
  addLine(200, y+2, 130, y+2);
  y = addRow(['Shipping', `${data.shipping}`], y, [130, 160]);
  addLine(200, y+2, 130, y+2);
  y = addRow(['Total Discounts', `${data.overallDiscount}`], y, [130, 160]);
 
  addText('Grand Total', 130, y, 12);
  addText(`${(data.subTotal).toFixed(2)}`, 160, y, 12);


  y += lineHeight;

  // Add line below summary
  addLine(10, y, 200, y);



  doc.save('invoice.pdf')
}