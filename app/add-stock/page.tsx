'use client'

import { useState, useEffect } from 'react'
import { Field, Form, Formik, ErrorMessage } from 'formik'
import { getConfig } from '@/utils/api'
import { dataConfigType } from '@/types/config'
import { stockSchema } from '@/types/stock'

export default function AgregarStock() {
  const [dataConfig, setDataConfig] = useState<dataConfigType | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

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

  const handleAddStock = async (values: any, { resetForm }: any) => {
    try {
      console.log("Agregar stock:", values)
      // Aquí irá la lógica para agregar stock
      setMessage({ type: 'success', text: '✓ Producto agregado al stock exitosamente' })
      resetForm()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error agregando stock:", error)
      setMessage({ type: 'error', text: '✗ Error al agregar el producto' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  if (!dataConfig) {
    return <div className="p-8 text-center" style={{ color: '#616d48' }}>Cargando...</div>
  }

  return (
    <div className="flex items-center justify-center font-sans pt-16" style={{ backgroundColor: '#ffccb6', minHeight: 'calc(100vh - 64px)' }}>
      <main className="flex w-full max-w-2xl flex-col items-center justify-start py-8 px-6 sm:py-12 sm:px-8" style={{ backgroundColor: '#fff5f0' }}>
        <div className="max-w-lg mx-auto p-6 rounded-2xl shadow-xl border-2 w-full" style={{ backgroundColor: '#fff5f0', borderColor: '#fa9b71' }}>
        <header className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: '#616d48' }}>Agregar Stock</h1>
          <p className="text-sm" style={{ color: '#fa9b71' }}>Ingresa nuevos productos al inventario</p>
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

        <Formik
          initialValues={{
            model: '',
            fabric: '',
            quantity: 1,
          }}
          validationSchema={stockSchema}
          onSubmit={handleAddStock}
        >
          {({ errors }) => {
            const hasErrors = Object.keys(errors).length > 0
            return (
              <Form className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Modelo</label>
                  <Field 
                    as="select" 
                    name="model" 
                    className="w-full p-2 border-2 rounded-md bg-white"
                    style={{ borderColor: '#fa9b71', color: '#616d48' }}
                  >
                    <option value="">-- Seleccionar Modelo --</option>
                    {dataConfig.models.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="model" component="div" className="text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Tela</label>
                  <Field 
                    as="select" 
                    name="fabric" 
                    className="w-full p-2 border-2 rounded-md bg-white"
                    style={{ borderColor: '#fa9b71', color: '#616d48' }}
                  >
                    <option value="">-- Seleccionar Tela --</option>
                    {dataConfig.fabrics.map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="fabric" component="div" className="text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Cantidad</label>
                  <Field 
                    type="number" 
                    name="quantity" 
                    className="w-full p-2 border-2 rounded-md"
                    style={{ borderColor: '#fa9b71', color: '#616d48' }}
                    min="1"
                  />
                  <ErrorMessage name="quantity" component="div" className="text-xs mt-1" />
                </div>

                <button 
                  type="submit" 
                  disabled={hasErrors}
                  className="w-full text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{ backgroundColor: hasErrors ? '#999999' : '#616d48' }} 
                  onMouseDown={(e) => { 
                    if (!hasErrors) (e.currentTarget as any).style.transform = 'scale(0.98)'
                  }} 
                  onMouseUp={(e) => { 
                    if (!hasErrors) (e.currentTarget as any).style.transform = 'scale(1)'
                  }}
                >
                  Agregar Stock
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
      </main>
    </div>
  )
}
