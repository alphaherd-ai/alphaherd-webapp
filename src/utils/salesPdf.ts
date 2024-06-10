import jsPDF from "jspdf";

export function generatePdfForInvoice(data : any, appState : any,items : any){
    console.log(JSON.stringify(data))
        var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
        doc.setFontSize(20)
        doc.text(appState.currentBranch?.org.orgName!, 65, 6);
        doc.setFontSize(14)
        doc.text(`${appState.currentBranch?.branchName}`, 65, 14, { maxWidth: 100 });
        doc.setLineWidth(0.3);
        doc.line(0, 30, 420, 30);
    
        doc.setFontSize(20)
        doc.text("Transaction details", 20, 40);
        doc.setFontSize(16)
        doc.text("Subject: Sale", 20, 50);
        doc.text("Mode: Cash", 100, 50);
        doc.text(`Amount Received: ${data.totalCost}`, 180, 50);
    
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        var todayString = mm + '/' + dd + '/' + yyyy;
    
        doc.text(`Date: ${todayString}`, 20, 60);
        doc.text(`Receipt No.: ${data.invoiceNo}`, 100, 60);
        doc.text("Balance due: 0", 180, 60);
        doc.setLineWidth(0.3);
        doc.line(0, 65, 420, 65);
    
        doc.setFontSize(20)
        doc.text("Sales Invoice details", 20, 75);
        doc.setFontSize(16)
        doc.text(`Invoice No.: ${data.invoiceNo}`, 20, 85);
        doc.text(`Date: ${todayString}`, 100, 85);
        doc.text(`Billed to: ${data.customer}`, 20, 95);
        doc.text("Phone No.: +91 99999 99999", 100, 95);
    
    
        today = new Date(data.dueDate);
        dd = String(today.getDate()).padStart(2, '0');
        mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        yyyy = today.getFullYear();
        todayString = mm + '/' + dd + '/' + yyyy;
    
        doc.text(`Pay by: ${todayString}`, 20, 105);
        doc.text(`Last date of return: ${todayString}`, 100, 105);
        doc.text(`Notes: ${data.notes}`, 20, 115);  
          
        doc.setFontSize(16)
        doc.text("No.", 20, 135);
        doc.text("Product/Service", 60, 135);
        doc.text("Qty.", 150, 135, { maxWidth: 40 });
        doc.text("Unit price", 190, 135);
        doc.setLineWidth(0.3);
        doc.line(15, 140, 260, 140);
    
        let y = 140;
    
        for (let i = 0; i < items.length; i++) {
          y += 15;
          doc.text(`${i+1}`, 20, y);
          doc.text(`${items[i].name}`, 60, y);
          doc.text(`${items[i].quantity}`, 150, y, { maxWidth: 40 });
          doc.text(`${items[i].sellingPrice}`, 190, y);
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
    
        y += 10;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
        doc.text("Subtotal", 100, y, { maxWidth: 40 });
        doc.text(`${data.totalCost}`, 190, y);
    
        y += 5;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
        doc.setLineWidth(0.3);
        doc.line(90, y, 260, y);
    
        y += 15;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
        doc.text("Taxable Value", 100, y, { maxWidth: 40 });
        doc.text("Tax Rate", 150, y, { maxWidth: 40 });
        doc.text("Tax Amount", 190, y);
    
        y += 5;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
    
        for (let i = 0; i < items.length; i++) {
          doc.setLineWidth(0.3);
          doc.line(90, y, 260, y);
    
          y += 15;
          if (y > 210) {
            y = 10;
            doc.addPage();
          }
    
          doc.text(`${items[i].quantity * items[i].sellingPrice}`, 100, y, { maxWidth: 40 });
          doc.text("Tax Rate: ", 150, y, { maxWidth: 40 });
          doc.text(`${items[i].taxAmount}`, 190, y);
    
          y += 5;
          if (y > 210) {
            y = 10;
            doc.addPage();
          }
    
          doc.setLineWidth(0.3);
          doc.line(90, y, 260, y);
        }
    
        y += 10;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
        doc.text("Shipping", 100, y, { maxWidth: 40 });
        doc.text(`${data.shipping}`, 190, y);
    
        y += 5;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
    
        y += 10;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
        doc.text("Total Discount", 100, y, { maxWidth: 40 });
        doc.text(`${data.overallDiscount}`, 190, y);
    
        y += 5;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
    
        y += 10;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
        doc.text("Grand Total", 100, y, { maxWidth: 40 });
        doc.text(`${data.subTotal}`, 190, y);
    
        y += 5;
        if (y > 210) {
          y = 10;
          doc.addPage();
        }
    
        doc.setLineWidth(0.3);
        doc.line(90, y, 260, y);

        doc.save('invoice.pdf')
}