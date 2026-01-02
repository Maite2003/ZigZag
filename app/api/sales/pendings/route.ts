import { NextResponse } from "next/server";
import axios from 'axios';

export async function GET() {
  try {
    const req = await axios.get('http://localhost:5678/webhook/b88ec717-d639-4c0c-aec4-98f7a3e3bec2');

    if (req.status !== 200 || !req.data) {
      return NextResponse.json({ error: 'Error consiguiendo los pagos pendientes'}, { status: 500 });
    }

    return NextResponse.json({ pendings: req.data.pendings}, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Error consiguiendo los pagos pendientes'}, { status: 500 });
  }
}

export async function POST(
  request: Request
) {
  try {
    const sale = await request.json();

    if (!sale) {
      return NextResponse.json({ error: 'Falta venta para actualizar '}, { status: 400 });
    }
    const req = await axios.post('http://localhost:5678/webhook-test/473942c2-c61c-405d-beb9-03136f1dc3ff', sale);
    if (req.status !== 200 ){ 
      return NextResponse.json({ error: 'Error actualizando venta' }, { status: 500 });
    }

    return NextResponse.json({ sale: req.data }, { status: 200 });
  } catch(error) {
    return NextResponse.json({ error: 'Error actualizando venta' }, { status: 500 });
  }
}