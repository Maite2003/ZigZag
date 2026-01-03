import { updateSale } from "@/services/n8nService";
import { NextResponse } from "next/server";

// export async function GET() {
//   try {
//     const req = await axios.get('http://localhost:5678/webhook/b88ec717-d639-4c0c-aec4-98f7a3e3bec2');
//     if (req.status !== 200 || !req.data) {
//       return NextResponse.json({ error: 'Error consiguiendo los pagos pendientes'}, { status: 500 });
//     }

//     return NextResponse.json({ pendings: req.data.pendings}, { status: 200 });

//   } catch (error) {
//     return NextResponse.json({ error: 'Error consiguiendo los pagos pendientes'}, { status: 500 });
//   }
// }

export async function PUT(
  request: Request
) {
  try {
    const sale = await request.json();
    console.log(sale)
    if (!sale) {
      return NextResponse.json({ error: 'Falta venta para actualizar '}, { status: 400 });
    }
    const updatedSale = await updateSale(sale);

    return NextResponse.json({ sale: updatedSale }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ error: 'Error actualizando venta' }, { status: 500 });
  }
}