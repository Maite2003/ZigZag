import { NextResponse } from "next/server";
import { getConfig } from "@/services/n8nService";

export async function GET() {
  try {
    const config = await getConfig()
    if (!config) {
      return NextResponse.json({ error: "Problemas con la api "}, { status: 500 })
    }

    const rawPrices = config.pricePerModel || {};
    const modelsList = [...Object.keys(rawPrices), "Otro"];

    return NextResponse.json({ config: { ...config, models: modelsList }}, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}