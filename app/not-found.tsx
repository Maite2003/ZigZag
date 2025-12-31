import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center font-sans" style={{ backgroundColor: '#fff5f0' }}>
      <main className="flex min-h-screen w-full max-w-2xl flex-col items-center justify-center py-8 px-6 sm:py-16 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4" style={{ color: '#616d48' }}>404</h1>
          <p className="text-2xl mb-6" style={{ color: '#fa9b71' }}>Página no encontrada</p>
          <p className="text-sm mb-8" style={{ color: '#616d48' }}>
            Lo sentimos, la página que buscas no existe.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-3 font-bold rounded-lg transition-all shadow-lg"
            style={{ backgroundColor: '#616d48', color: 'white' }}
          >
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  )
}
