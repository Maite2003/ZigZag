'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center font-sans" style={{ backgroundColor: '#fff5f0' }}>
      <main className="flex min-h-screen w-full max-w-2xl flex-col items-center justify-center py-8 px-6 sm:py-16 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#616d48' }}>¡Oops!</h1>
          <p className="text-lg mb-6" style={{ color: '#fa9b71' }}>Algo salió mal</p>
          <p className="text-sm mb-8" style={{ color: '#616d48' }}>
            {error.message || 'Ocurrió un error inesperado. Por favor, intenta de nuevo.'}
          </p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 font-bold rounded-lg transition-all shadow-lg"
            style={{ backgroundColor: '#616d48', color: 'white' }}
          >
            Intentar de nuevo
          </button>
        </div>
      </main>
    </div>
  )
}
