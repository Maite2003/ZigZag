import { NextResponse } from "next/server";
import axios from 'axios'

export async function POST(
  request: Request,
) {
  try {
    const purchase = await request.json();

    if (!purchase) {
      return NextResponse.json({error: "Falta payload"}, { status: 400 });
    }

    const req = await axios.post('http://localhost:5678/webhook/d6d05ef7-a4a2-49b4-9474-e575724bb4aa', purchase);
    if (req.status !== 200) {
      return NextResponse.json({ error: "Error creando fila en sheets "}, { status: 500 });
    }

    return NextResponse.json({ purchase: req.data }, { status: 201 });
  } catch(error) {
    return NextResponse.json({ error: "Error con la api /sale"}, { status: 500 });
  }
}

