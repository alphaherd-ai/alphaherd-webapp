import { connectToDB } from '../../../../utils/index';
import prismaClient from '../../../../../prisma';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {

  console.log("INSIDE API");

  var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
  doc.setFontSize(20)
  doc.text("Pet First 24/7 Hospital", 65, 6);
  doc.setFontSize(14)
  doc.text("#16, 1st Cross, 515 Colony, HAL 3rd Stage, New Thippasandra, Bangalore-560075 ", 65, 14, { maxWidth: 100 });
  doc.setLineWidth(0.3);
  doc.line(0, 30, 420, 30);

  doc.setFontSize(20)
  doc.text("Transaction details", 20, 40);
  doc.setFontSize(16)
  doc.text("Subject: Sale", 20, 50);
  doc.text("Mode: Cash", 100, 50);
  doc.text("Amount Received: 1000", 180, 50);
  doc.text("Date: 21/12/2023", 20, 60);
  doc.text("Receipt No.: RE00001", 100, 60);
  doc.text("Balance due: 0", 180, 60);
  doc.setLineWidth(0.3);
  doc.line(0, 65, 420, 65);

  doc.setFontSize(20)
  doc.text("Sales Invoice details", 20, 75);
  doc.setFontSize(16)
  doc.text("Invoice No.: SI-00001", 20, 85);
  doc.text("Date: 21/12/2023", 100, 85);
  doc.text("Billed to: Quentin Tarantino", 20, 95);
  doc.text("Phone No.: +91 99999 99999", 100, 95);
  doc.text("Pay by: 23/12/2023", 20, 105);
  doc.text("Last date of return: 28/12/2023", 100, 105);
  doc.text("Notes: ", 20, 115);


  doc.setFontSize(16)
  doc.text("No.", 20, 135);
  doc.text("Product/Service", 60, 135);
  doc.text("Qty.", 150, 135, { maxWidth: 40 });
  doc.text("Unit price", 190, 135);
  doc.setLineWidth(0.3);
  doc.line(15, 140, 260, 140);

  var products = [{ product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  { product_name: "Paracetamol", quantitiy: "5 Strips", unit_price: "100", amount: "2700.00" },
  ];

  let y = 140;

  for (let i = 0; i < products.length; i++) {
    y += 15;
    doc.text("No.", 20, y);
    doc.text("Product/Service", 60, y);
    doc.text("Qty.", 150, y, { maxWidth: 40 });
    doc.text("Unit price", 190, y);
    if (y > 210) {
      y = 10;
      doc.addPage();
    }
  }

  y += 10;
  if (y > 210) {
    y = 10;
    doc.addPage();
  }

  doc.setLineWidth(0.3);
  doc.line(140, y, 260, y);

  y+=10;
if(y>210){
    y=10;
    doc.addPage();
}
doc.text("Subtotal", 100, y,{maxWidth : 40});
doc.text("Subtotal", 150, y,{maxWidth : 40});
doc.text("2500", 190, y);

y+=5;
if(y>210){
    y=10;
    doc.addPage();
}
doc.setLineWidth(0.3);
doc.line(90, y, 260, y);

y+=15;
if(y>210){
    y=10;
    doc.addPage();
}
doc.text("Subtotal", 100, y,{maxWidth : 40});
doc.text("Subtotal", 150, y,{maxWidth : 40});
doc.text("2500", 190, y);

y+=5;
if(y>210){
    y=10;
    doc.addPage();
}

doc.setLineWidth(0.3);
doc.line(90, y, 260, y);

y+=15;
if(y>210){
    y=10;
    doc.addPage();
}

doc.text("Subtotal", 100, y,{maxWidth : 40});
doc.text("Subtotal", 150, y,{maxWidth : 40});
doc.text("2500", 190, y);

y+=5;
if(y>210){
    y=10;
    doc.addPage();
}

doc.setLineWidth(0.3);
doc.line(90, y, 260, y);

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