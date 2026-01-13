'use client';

import { Product } from '../../types/config'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductCardProps {
  product: Product;
  price?: number | string;
}

export function ProductCard({ product, price }: ProductCardProps) {
  const photoArray = (product.photos || []).filter((p: string) => p?.trim?.());
  const mainPhoto = photoArray.length > 0 ? photoArray[0].trim() : "/placeholder.png";

  const phone = "5492236320397"; 
  const message = `Hola! Me interesa el producto ${product.model} - ${product.fabric}...`;
  const link = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-orange-100 flex flex-col h-full group">
      
      <div className="relative aspect-4/5 w-full bg-gray-100 overflow-hidden">
        {photoArray.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            spaceBetween={0}
            slidesPerView={1}
            loop={photoArray.length > 1}
            simulateTouch={true}
            grabCursor={true}
            className="w-full h-full"
          >
            {photoArray.map((photo, idx) => (
              <SwiperSlide key={idx} className="flex items-center justify-center bg-gray-100">
                <img
                  src={photo.trim()}
                  alt={`${product.model} - foto ${idx + 1}`}
                  className="w-full h-full object-cover"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </SwiperSlide>
            ))}

            {photoArray.length > 1 && (
              <>
                <button
                  className="swiper-button-prev-custom absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition z-10 w-8 h-8 flex items-center justify-center"
                  aria-label="Foto anterior"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition z-10 w-8 h-8 flex items-center justify-center"
                  aria-label="Siguiente foto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </Swiper>
        ) : (
          <img
            src={mainPhoto}
            alt={product.model}
            className="w-full h-full object-cover"
          />
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