import { Product } from '../../types/config'

interface ProductCardProps {
  product: Product;
  price?: number | string;
}

export function ProductCard({ product, price }: ProductCardProps) {
  const photoArray = product.photos || [];
  const mainPhoto = photoArray.length > 0 && photoArray[0].trim() !== '' ? photoArray[0].trim() : "/placeholder.png";

  const phone = "5492236320397"; 
  const message = `Hola! Me interesa el producto ${product.model} - ${product.fabric}...`;
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-orange-100 flex flex-col h-full group">
      
      <div className="relative aspect-4/5 w-full bg-gray-100 overflow-hidden">
        <img 
          src={mainPhoto} 
          alt={product.model}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        
        {photoArray.length > 1 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
            + {photoArray.length - 1} fotos
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col grow">
        <div className="flex justify-between items-start mb-2 gap-2">
          <h3 className="font-bold text-gray-900 text-base leading-tight flex-1 min-h-fit">{product.model || 'Producto sin nombre'}</h3>
          {price && (
            <span className="font-bold text-sm whitespace-nowrap" style={{color: '#616d48'}}>
              ${price}
            </span>
          )}
        </div>
        
        <p className="text-gray-500 text-xs mb-3 capitalize">{product.fabric}</p>

        <div className="mt-auto w-full">
          <a href={link} target="_blank" rel="noopener noreferrer" 
          className="block w-full text-white text-center py-2 px-3 rounded-lg font-semibold text-sm transition"
          style={{ backgroundColor: '#fa9b71', cursor: 'pointer' }} 
          >
            Consultar
          </a>
        </div>
      </div>
    </div>
  );
}