// import { connectToDB } from '../../../../utils/index';
// import prisma from '../../../../../prisma/index';
// import { env } from 'process';


// export const DELETE=async (req: Request )=> {
//     if (req.method !== 'DELETE') {
//         return new Response('Method not allowed',{status:405});
//     }
//     // const paramString=req.url;
//     // const searchParams = new URLSearchParams(paramString);
//     // const  id  = searchParams.getAll(process.env.BASE_URL+"/api/product/delete?id")[0];
//     // console.log(id)
//     try {
//         await connectToDB();
//         await prisma.product.delete({
//             where: { id: '65b910f432647dd24a1e63e5' },
//         });
//         return new Response(null,{status:204})
//     } catch (error) {
//         return new Response( "Internal server error",{status:500});
//     } finally {
//         await prisma.$disconnect();
//     }
// }
