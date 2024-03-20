import { connectToDB } from '../../../../utils/index';
import prisma from '../../../../../prisma/index';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export const GET = async (req: Request, res: Response) => {

  const doc = new jsPDF();
  var imgData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAvRSURBVHgB7VoLcFTVGf7uPrKb3WxCNiEkJCRCEBGwyktrAd/oCIpVmdqioJZaX3WmKlOtHfHBoOKMYAenIgK+QLAgoNjyKEx5FSnlLSAQAiSEhDx289hks+/b/5xz90W404buXerM/ZjLbvae+zjfOed/fP+RQvuHy9DRBQbouCB0YlSgE6MCnRgV6MSoQCdGBToxKtCJUYFOjAp0YlRgQhrAco7l65txoMIHZ7YJk8fnoiDvwo/+gtrtOuRDYb4Rv74/DzlZRlwKpIWY9z5vxJJ1LRAUSdi+34t5L/VGr3xzcruljVi8tpWahXm7vUc68fmsMvqWfmi+lOqagli6rpk6G6GDESOjrtGPGQvqIZ/XbvFaaoeI8ouMU7U+bNndjksBzYk5esqf0NXop4w9R7w4eNQXa3f4hE/wFoXE5omErbs7cCmgOTEdnWExU6ijfEkovZfpc+/ReKe9/nD8PCNFaef2BHEpoDkxJb3MvKNytMOcIPYJBMLxdmaj+E3MFMRmTK6K8Q2FZQSC2klJmhMzpH8mCnJN9KAEE8q+yhIyEkz/qKEO2KzK6xCJjEiJFuEt1zmS7sf4/eRrN+586iRufqwCH9N3LaA5MSaaCQ+Oy0VEEssn0ZCMGZoV+55tN+BXP82j02KmSPRq119lx5hhWUn3W7DSjfdXNMHjDSFMM+6DL12oPONHqpEWd/3AHbloag5j8V/d3PAyPDjOif6llqR2k4jA/BwTtuxrx4A+GZg4Njfp/PEqPxZ95UKiO5MjMvdo5X0sSCVSSsypmgDepZil2RPGNZdbMGm8E4V5IlZ5+uf5GHt9FnYc8NLysmLEINsF73H7KAc/LoQ1W1tpRkVi9kdAgt2a+omfUmJe+GMtqusDfLUcr/Jh894OzJlWjPISMZoDyqz8OB/+gIxNOz045wrCbJIwmIgbOtAWs8NRnK0PIulHek4viqD7lmQg1UgZMU3NIZypZ2tdEu9OL93gCuGFd2vx6Ywy2DK7jiojcPn6FixYzWxGBBHuuETHe+ebcPeNOXhkgjPGRX9aLjsOKC5eEl5s6j156OFIvUVI2Ry02wzIyDAkrH8R5dY0BLF2R1uX9s1tYTz2WjXeWdKAto6I8EKcUHFdbWMAH6xwYeLzVfiuopNfw2xQSYGYHXaLhGkPFWDCzdnQAlIq60pPzzyDPcd8IvxPwLhR2Zj+RFHsbxfNriffqOHLLsrFsIF2FBeYmBfH3u+9ONsQELOHzhmJ7ycn5uOhu53o9EVwotpPy8eCLJt2TjWlc/DFqYWY8odqdAbYmhAJI++YMd6BCHE2bc5ZVMVIkZFNS2Hu73sTAWLN7DnsxdOzasQF9FOI7vGnL9201CRMmZCLqwZkQmuklPI+hWbMn15MI888kQjrrVYJ40bHvczcZU34nvInKSGmsVsQI4Uhy24U5/gh/E8kHME8il/W/6MN6UDKrdbl5HWWzboMm3e1o84dwKgf2VFeKjzRvqOdWLberXhahQjOTfL4iNOJ3kdEPxE68+6SJlx9hY30Gm1DME3uzlzu2J90jUVmLToHFgKzbsYNLUOymUvmRFZsjTDKze0UKH7jxrRHCqAl0iZtbiVd5WRdUJGqoHAhkkqHPTlRzM4yCBMFxAywpNgrRtCqza2obQhBS6QlJWBYtqGFj8LIQXZKDG1RMY9yKUogr0nOh3pRtPzR66Vki+J6jd8vY/nGFpxtDCJEAc+WPe34xZ09oBXSQoy7NYSDFV4++q88XoB8539+7MC+Vn4korCnGS9SdM1m3P5jHZoSk5alxNS6UJhNEBnO3IsXt7NskggD6KOqTlsBKy3EHDnp40tHpk6da7p42+BuCYv7kJ2x27R99bQspbaOMB9pprX8dlYtrr0qEwbF9UhGGTcOc2DYlclB29eb21BZ41eIEIrdxl0ecQ3961+cWpnhfKSFGCkat1APqxt8qN7oi3snmrRb93Rg1ey+sfZVtX68Sa49IkfbKK0VV8X+v/U6B7REWojpx0ZX9sREbtYxQ1QHhqx8xhEIilnCgmFnjhEZZglBygtcLdxQ4SZS9UYO0TYtSAsx42/IwUekzTJpQSwERcdLqAYkgqVWNwy14ZF78nFlv0xqJtp4OyPo8IbJq5m7aDWpRlqMLyuzTiY1L/44KZ4LAV0qjf1Id3n7uRIMKrfGSGFgmk7PPO1JAdIY+U6+y4nH73PG7IRSK+GHSDr/vyCle58vE64/JkG7pp5UftIgmPj93OQCOHukLQj/ryDpG6AvDH1/jAp0YlSgE6OCblu8DopFmKofpKzQRAFHb8WjtFKRTU4QnHJIx231JOdFmRlGWEjdb6G2re0h5PUwIyuhrOL3R0gvjgvpVqo6iJhXlGRYZSEQjPDgsJhk1KjX9pEk0egOcnfOjHiX51rouRnd8/HdJobVdaa/fw5F+UZ4vTIcFKMsIu3kd1Q/OnhclDnYG7/zbBGen10n9Frl2meoGulqiWD135uRm20kOSKCz94oEzsiCBtJDp0xv54HgAwPURnX3RYiMR24i4LEx2fU0ECYKNALI9NqwqLX+uDQiU68Pr+BCBYB4FSqf6/4WwuJ7UIUM9Ldhg+2Ye6LxegOLspHsjB95ex+VFSXMebRSuxkRTBi4DcP5OPBu5xxEj91YOFXbuzc78WHr5Tw3OfWxyrw6D098fCEC2spvUjLXZ2QN82cf46ycikWBS6b1ZeLW+OfqcT2fR1cR76s0IT3Xy7lETMjY+LtPXDiTABTXq7G0rfKUFrY/Uplt4mJBqwsb2G1H/bGOQ6xHD5a04Llm1rhoFryp2+WxXTdqMbLtsBMIeLmLW/Cuh3NuGVkNgV+ubBaDMq9ZbTTUl242k3LRcb4MdlQttKIIJm+/GW7h2pLYfh9MoYPykQxiVevzqvHvc+exI+H2PEozZiiniZhPClOYp8XEyl3nxg63G1Bqh+dohEyYtwYO0YOtmPhKjcm3JCNu2/K5iMnnUdmFL+8Nw93js7GvmOdmLO4ie/ivH9sjjjJE2gJAbIzkkHUoKIDoYgUOFrZiTXbPHiArinKN/Nj2dulXPNhpZmZH9bjvZeKlTro+TK7hsSwJzkpWv1mbnlyjkNvzzrLdjqwEZp6r7NLqM/2s7y1sIHqT0aKeiXe8ehsE5BgI5XuKVqSsV8SNljJZK2mPVyAsiIz5n7RBIPBAJsVXB102A38fnmJEbSEJIfQHRinP9H71e5cwDYC5ZM3YVs5EmGmhZ9LtocljA5S+QdQLYm9LCuklRBBA8os3KOEicBGKtH6A8JQjhpqj78McdSL9GCWPMb6Roz07W3GZUUWfu+hAzN5JXIEieoGKYLB5ZlcIPeQpxxBS4ttAjCTTGGg5+bYjXzXhCWj+1GJnhKoQA/wVJCSlLaGpnItZctXX2FFB8USASrqsxLq2YYgXwq1JICzaT+MpnWzJ8LdLVPn2toj3MYcPO5DRgb4+caWECrPBMmOmPhmxYrqIPdQTBM+UeXnQ8kCRMgGik+sOH7az22ZnYK7MxS7lBamRsJIyYzZe9hHdiNILxkg/bYd63e08ZjlMAVfLHZ1UVR6okpEo5t3e3C8KoCTNT5s+LYVsz9p4ET96zsv135nftDAiWBt2N9n6/3YRvfctredF+1YtPjn9a2c6DoakDmfNfJtI/WuINZQhTJVSAkx1w6x4p8U5BU4DRSJ+nHsNBHlDvGolRXJTlMN6L7bhHjNdjms3d6KNVva+Kj7afBHUGQ6Zrgd51whPDMpj4jw8J3izNMdqujklUe2WYBd25+MuMMu4RqaQd8e8PKNQxuUHRByCq1lSoh555NGlJdaeHA2iaqDRUSGj/Ke8mIrd5aBQJh7M4YsuwnjRzvwsztyafobcfUACxatdmHVpjaMJp137fZ2FFOKkGUz8Zr2fbfl4PkpBdxbRWvcOay2Tf+OsWVEwVwBxTIeSk8qaRYuWOniHup/hWZeiaULzGWmQ5/VAprpiUbjD5QRBbq7VoFOjAp0YlSgE6MCnRgV6MSoQCdGBToxKtCJUYFOjAr+DTjvkKqPro6QAAAAAElFTkSuQmCC';
  doc.addImage(imgData, 0, 0, 50,50);
  doc.setFontSize(20)
  doc.text("Octocat loves jsPDF", 65, 6);
  doc.setLineWidth(1);
  doc.line(0, 50, 420, 50);

  autoTable(doc, {
    startY: 80,
    head: [['Name', 'Email', 'Country']],
    body: [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain']
    ]
  })

  autoTable(doc, {
    startY: 680,
    head: [['Name', 'Email', 'Country']],
    body: [
      ['David', 'david@example.com', 'Sweden'],
      ['Castille', 'castille@example.com', 'Spain'],
      // ...
    ]
  })

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
    await prisma.$disconnect();
  }
};