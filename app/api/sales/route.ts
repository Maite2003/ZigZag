import { NextResponse } from "next/server";
import { postSale } from "@/services/n8nService";

export async function POST(
  request: Request,
) {
  try {
    const sale = await request.json();

    if (!sale) {
      return NextResponse.json({error: "Falta payload"}, { status: 400 });
    }

    const newSale = await postSale(sale);

    return NextResponse.json({ sale: newSale }, { status: 201 });
  } catch(error) {
    return NextResponse.json({ error: "Error con la api /sale"}, { status: 500 });
  }
}

