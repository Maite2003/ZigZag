'use client'

import { useState, useEffect } from 'react'
import { getConfig } from '@/utils/api'
import { dataConfigType } from '@/types/config'

export default function ActualizarPago() {
  const [dataConfig, setDataConfig] = useState<dataConfigType | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [saleId, setSaleId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const config: dataConfigType = await getConfig()
        setDataConfig(config)
      } catch (error) {
        console.error("Error cargando configuración:", error)
      }
    }
    fetchConfig()
  }, [])

  const handleUpdatePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aquí irá la lógica para actualizar el pago
      console.log("Actualizar pago para ID:", saleId)
      setMessage({ type: 'success', text: '✓ Pago actualizado exitosamente' })
      setSaleId('')
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error actualizando pago:", error)
      setMessage({ type: 'error', text: '✗ Error al actualizar el pago' })
      setTimeout(() => setMessage(null), 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
      <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <div className="max-w-lg mx-auto p-6 rounded-2xl shadow-xl border-2 w-full" style={{ backgroundColor: '#fff5f0', borderColor: '#fa9b71' }}>
        <header className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#616d48' }}>Actualizar Pago</h1>
          <p className="text-sm" style={{ color: '#fa9b71' }}>Marca una venta como pagada</p>
        </header>

        {message && (
          <div 
            className="mb-4 p-3 rounded-lg text-sm font-medium transition-all" 
            style={{
              backgroundColor: message.type === 'success' ? '#e8f5e9' : '#ffebee',
              color: message.type === 'success' ? '#616d48' : '#fa9b71',
              borderLeft: `4px solid ${message.type === 'success' ? '#616d48' : '#fa9b71'}`
            }}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleUpdatePayment} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>ID de Venta</label>
            <input 
              type="text" 
              value={saleId}
              onChange={(e) => setSaleId(e.target.value)}
              placeholder="Ingresa el ID de la venta"
              className="w-full p-2 border-2 rounded-md"
              style={{ borderColor: '#fa9b71', color: '#616d48' }}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !saleId}
            className="w-full text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
            style={{ backgroundColor: !saleId || isLoading ? '#999999' : '#616d48' }} 
            onMouseDown={(e) => { 
              if (saleId && !isLoading) (e.currentTarget as any).style.transform = 'scale(0.98)'
            }} 
            onMouseUp={(e) => { 
              if (saleId && !isLoading) (e.currentTarget as any).style.transform = 'scale(1)'
            }}
          >
            {isLoading ? 'Actualizando...' : 'Actualizar Pago'}
          </button>
        </form>
      </div>
      </main>
    </div>
  )
}
