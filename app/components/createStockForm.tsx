'use client'

import { DataConfigType } from "@/types/config"
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { stockSchema } from "@/types/stock";
import axios from "axios";


export function CreateStockForm({ config }: { config: DataConfigType }) {
  const [dataConfig, setDataConfig] = useState<DataConfigType>(config);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const handleAddStock = async (values: any, { resetForm }: any) => {
    try {
      await axios.post('/api/stock', values);

      setMessage({ type: 'success', text: 'Producto agregado al stock exitosamente' })
      resetForm()
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error("Error agregando stock:", error)
      setMessage({ type: 'error', text: 'Error al agregar el producto' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return(
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
            timestamp: new Date().toISOString().split('T')[0]
          }}
          validationSchema={stockSchema}
          onSubmit={handleAddStock}
        >
          {({ isValid, dirty }) => {
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
                <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Fecha</label>
                <Field name="timestamp" type="date" className="w-full p-2 border-2 rounded-md bg-white" style={{ borderColor: '#fa9b71', color: '#616d48' }} />
                <ErrorMessage name="timestamp" component="div" className="text-xs mt-1" />
              </div>

                <button 
                  type="submit" 
                  disabled={!isValid || !dirty}
                  className="w-full text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{ backgroundColor: !isValid ? '#999999' : '#616d48' }} 
                  onMouseEnter={(e) => { 
                    if (isValid) {
                      (e.currentTarget as any).style.backgroundColor = '#fa9b71'; 
                      (e.currentTarget as any).style.boxShadow = '0 0 20px rgba(250, 155, 113, 0.5)'; 
                    }
                  }} 
                  onMouseLeave={(e) => { 
                    if (isValid) {
                      (e.currentTarget as any).style.backgroundColor = '#616d48'; 
                      (e.currentTarget as any).style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; 
                    }
                  }} 
                  onMouseDown={(e) => { 
                    if (isValid) (e.currentTarget as any).style.transform = 'scale(0.98)'; 
                  }} 
                  onMouseUp={(e) => { 
                    if (isValid) (e.currentTarget as any).style.transform = 'scale(1)'; 
                  }}
                >
                  Agregar Stock
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
  );
}