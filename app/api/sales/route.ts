import { NextResponse } from "next/server";
import { postSale } from "@/services/n8nService";
import { getServerSession } from "next-auth";
import { saleSchema } from "@/types/sales";

export async function POST(
  request: Request,
) {

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  
  try {
    const sale = await request.json();

    if (!sale) {
      return NextResponse.json({error: "Falta payload"}, { status: 400 });
    }

    await saleSchema.validate(sale, { abortEarly: false });

    const newSale = await postSale(sale);

    return NextResponse.json({ sale: newSale }, { status: 201 });
  } catch(error:any) {

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

