import { postStock } from "@/services/n8nService";
import { backendStockSchema } from "@/types/basicStock";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function POST(request:Request) {

  const session = await getServerSession();

  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  
  try {
    const newStock = await request.json();
    if (!newStock) {
      return NextResponse.json({ error: 'Campo nuevo producto vacio'}, { status: 400 });
    }

    await backendStockSchema.validate(newStock, { abortEarly: false });

    const product = await postStock(newStock);
    return NextResponse.json({ product }, { status: 201 });
  } catch(error:any) {

    if (error.name === 'ValidationError') {
      return NextResponse.json({
        error: "Datos invalidos. Error de validacion",
        details: error.errors
      }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 })
  }
}