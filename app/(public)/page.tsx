import { getConfig } from "@/services/n8nService";
import { ProductCard } from "@/app/components/ProductCard";
import { DataConfigType, Product } from "@/types/config";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const config: DataConfigType = await getConfig();
  const stock: Product[] = config.stock;

  if (!stock || !Array.isArray(stock) || stock.length === 0) {
    return (
      <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
        <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
          <p style={{ color: '#616d48' }} className="text-lg font-semibold">No hay productos disponibles</p>
        </main>
      </div>
    );
  }

  return (
      <main className="w-full py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0', marginTop:'15vh' }}>
        <h1 className="text-3xl font-bold mb-2" style={{ color: '#616d48' }}>Nuestros Productos</h1>
        <p className="mb-8" style={{ color: '#fa9b71' }}>Explora nuestra colección de artículos exclusivos</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stock.map((product, index) => (
            <ProductCard
              key={`${product.model}-${product.fabric}-${index}`}
              product={product}
              price={config.pricePerModel[product.model]}
            />
          ))}
        </div>
      </main>
  );
}