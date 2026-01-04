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
    return NextResponse.json({ error: 'Error con la api /stock '}, { status: 500 })
  }
}