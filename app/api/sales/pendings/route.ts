import { updateSale } from "@/services/n8nService";
import { pendingSaleSchema } from "@/types/pendingSales";
import { saleSchema } from "@/types/sales";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request
) {

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  
  try {
    const sale = await request.json();
    if (!sale) {
      return NextResponse.json({ error: 'Falta venta para actualizar '}, { status: 400 });
    }

    await pendingSaleSchema.validate(sale, {abortEarly: false});

    const updatedSale = await updateSale(sale);

    return NextResponse.json({ sale: updatedSale }, { status: 200 });
  } catch(error: any) {

    if (error.name === 'ValidationError') {
      return NextResponse.json({
        error: "Datos invalidos. Error de validacion",
        details: error.errors
      }, { status: 400 });
    }
    
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}