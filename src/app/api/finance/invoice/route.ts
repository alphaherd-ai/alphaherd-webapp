import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import { generate } from '@pdfme/generator';
import { BLANK_PDF, Template} from '@pdfme/common';

const template: Template = {
    basePdf: BLANK_PDF,
    schemas: [
      {
        a: {
          type: 'text',
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        b: {
          type: 'text',
          position: { x: 10, y: 10 },
          width: 10,
          height: 10,
        },
        c: {
          type: 'text',
          position: { x: 20, y: 20 },
          width: 10,
          height: 10,
        },
      },
    ],
  };
  
  const inputs = [{ a: 'a1', b: 'b1', c: 'c1' }];

export const GET = async (req: Request, res: Response) => {
  if (req.method !== 'GET') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {

    let invoicePDF : Uint8Array = await generate({ template, inputs });
    console.log(invoicePDF);

    // res.setHeader('Content-Type', 'application/pdf');
    // res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');

    return new Response(invoicePDF, {
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
    await prisma.$disconnect();
  }
};