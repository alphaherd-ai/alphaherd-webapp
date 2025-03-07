
import prismaClient from '../../../../../prisma';
import { NextRequest } from 'next/server';


export const GET=async(req: NextRequest,res:Response)=> {
  if (req.method !== 'GET') {
    return new Response('Method not allowed',{status:405});
} 
    try { 
        const url= req.nextUrl
        //console.log("url : ",url);
        const { searchParams } = new URL(url);
        const orgId = searchParams.get("orgId")!;  
        const allNotifs= await prismaClient.notifications.findMany({where:{
          orgId:Number(orgId),
        },orderBy:[{
          createdAt:'asc'
        }]})
        const newNotifs = allNotifs.filter((notif)=>notif.isRead===false) 
        return new Response(JSON.stringify({newNotifs,allNotifs}), {
          status: 201,
          headers: {
              'Content-Type': 'application/json',
          },
      });
    } catch (error) {
      console.error(error)
      return new Response(JSON.stringify(error));
    } finally {
        await prismaClient.$disconnect();
    }
  }


//   import { NextRequest, NextResponse } from 'next/server'; // Import types from Next.js server
// import prismaClient from '../../../../../prisma'; // Assuming correct prisma import path
// import cron from 'node-cron';
// import axios from 'axios'; 
// import moment from 'moment';


// const sendExpiringInvoiceNotifications = async () => {
//   const today = moment().startOf('day').toDate();
//   const tomorrow = moment().add(1, 'days').startOf('day').toDate();

//   console.log("today is :", today);
//   console.log("tomorrow is :", tomorrow);

//   try {
    
//     const expiringInvoices = await prismaClient.purchases.findMany({
//       where: {
//         dueDate: {
//           gte: today,
//           lt: tomorrow,
//         },
//       },
//     });
//     console.log("expiring invoices list are :-" , expiringInvoices);

    
//     await Promise.all(
//       expiringInvoices.map(async (invoice) => {
//         const notifData = {
//           source: 'Inventory_Timeline_Removed',
//           orgId: 11, // Adjust orgId as per your requirements
//           data: {
//             invoiceNo: invoice.invoiceNo,
//             dueDate: invoice.dueDate,
//             totalCost: invoice.totalCost,
//           },
//         };
//         console.log("notif data in new file is :",notifData);

//         try {
//           // Sending notification to external service
//           await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_PATH}/api/notifications/create`, notifData);
//           console.log(`Notification sent for invoice #${invoice.invoiceNo}`);
//         } catch (error) {
//           console.error(`Failed to send notification for invoice #${invoice.invoiceNo}:`, error);
//         }
//       }
//     )
//     );
//   } catch (error) {
//     console.error('Error fetching expiring invoices:', error);
//   } finally {
//     await prismaClient.$disconnect(); // Ensure Prisma disconnects properly
//   }
// };

// // Schedule the cron job (daily at midnight)
// cron.schedule('38 22 * * *', async () => {
//   await sendExpiringInvoiceNotifications();
//   console.log('Checked for expiring invoices and sent notifications');
// });


// export const GET = async (req: NextRequest, res: Response) => {
//   if (req.method !== 'GET') {
//     return new Response('Method not allowed', { status: 405 });
//   }

//   try {
//     console.log("triggered");
//     // Trigger notifications for expiring invoices
//     await sendExpiringInvoiceNotifications();
//     return new Response(JSON.stringify({ message: 'Notifications sent' }), {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } catch (error) {
//     console.error('Error sending notifications:', error);
//     return new Response(JSON.stringify({ error: 'Failed to send notifications' }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });
//   } finally {
//     await prismaClient.$disconnect(); // Ensure Prisma disconnects properly
//   }
// };
