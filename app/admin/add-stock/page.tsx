
import { DataConfigType } from '@/types/config'
import { getConfig } from '@/services/n8nService'
import { CreateStockForm } from '@/app/components/CreateStockForm';

export const dynamic = 'force-dynamic';

export default async function AgregarStock() {
  const config: DataConfigType = await getConfig();

  return (
    <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
      <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <CreateStockForm config={config}></CreateStockForm>
      </main>
    </div>
  )
}
