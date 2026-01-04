import { getConfig } from "@/services/n8nService";
import { SaleForm } from "./components/saleForm";
import { DataConfigType } from "@/types/config";

export default async function Home() {
  let config: DataConfigType | undefined;
    try {
      config = await getConfig();
    } catch (e) {
      console.error(e);
    }

  if (!config) {
    return <div className="p-8 text-center rounded-2xl" style={{ color: '#616d48' }}>Por favor actualizar el excel</div>;
  }
  
  return (
    <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
      <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <SaleForm config={config}></SaleForm>
      </main>
    </div>
  );
}
