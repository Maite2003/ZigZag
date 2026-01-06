import { postStock } from "@/services/n8nService";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
  try {
    const newStock = await request.json();
    if (!newStock) {
      return NextResponse.json({ error: 'Campo nuevo producto vacio'}, { status: 400 });
    }

    const product = await postStock(newStock);
    return NextResponse.json({ product }, { status: 201 });
  } catch(error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 })
  }
}