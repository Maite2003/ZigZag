import { PendingSale } from '@/types/pendingSales';
import { getPendings } from '@/services/n8nService';
import { UpdateSaleForm } from '@/app/components/UpdateSaleForm';

export const dynamic = 'force-dynamic';

export default async function UpdatePaymentPage() {
  const initialSales: PendingSale[] = await getPendings();

  if (!initialSales || initialSales.length === 0) {
    return (
      <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
        <main className="flex w-full max-w-2xl flex-col items-center justify-center py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
          <div className="text-center">
            <p className="text-4xl mb-4">✓</p>
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#616d48' }}>¡Todo pagado!</h2>
            <p style={{ color: '#616d48' }}>No hay ventas pendientes de pago en este momento</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
      <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <UpdateSaleForm initialPendingSales={initialSales}></UpdateSaleForm>
      </main>
    </div>
  )
}

