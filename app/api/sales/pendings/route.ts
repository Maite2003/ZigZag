import { updateSale } from "@/services/n8nService";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request
) {
  try {
    const sale = await request.json();
    if (!sale) {
      return NextResponse.json({ error: 'Falta venta para actualizar '}, { status: 400 });
    }
    const updatedSale = await updateSale(sale);

    return NextResponse.json({ sale: updatedSale }, { status: 200 });
  } catch(error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}