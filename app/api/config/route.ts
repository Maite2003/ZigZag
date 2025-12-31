import { NextResponse } from "next/server";
import axios from 'axios'

export async function GET() {
  const req = await axios.get('http://localhost:5678/webhook/32305e74-4494-4131-b77e-0f87da09d82b');
  
  if (req.status !== 200 || !req.data) {
    return NextResponse.json({ error: "Problemas con la api "}, { status: 500 })
  }

  const rawPrices = req.data.pricePerModel || {};
  const modelsList = [...Object.keys(rawPrices), "Otro"];

  return NextResponse.json({ config: { ...(req.data), models: modelsList }}, { status: 200 });
}