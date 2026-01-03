
import { getPendings } from '@/services/n8nService';
import { UpdateSaleForm } from '../components/updateSaleForm'
import { PendingSale } from '@/types/pendingSales';

export default async function UpdatePaymentPage() {
  let initialSales: PendingSale[] = [];
  try {
    initialSales = await getPendings(); 
  } catch (e) {
    console.error(e);
  }

  if (!initialSales || initialSales.length === 0) {
    return <div className="p-8 text-center rounded-2xl" style={{ color: '#616d48' }}>No hay ventas sin pagar</div>;
  }

  return (
    <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
      <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <UpdateSaleForm initialPendingSales={initialSales}></UpdateSaleForm>
      </main>
    </div>
  )
}

