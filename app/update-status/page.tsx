'use client'

import { useState, useEffect } from 'react'
import { getPendings, updateSale } from '@/utils/api'
import { PendingSale, pendingSaleSchema } from '@/types/pendingSales'
import { ErrorMessage, Field, Form, Formik } from 'formik'

export default function ActualizarPago() {
  const [pendings, setPendings] = useState<PendingSale[] | null>(null);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPendings = async () => {
      try {
        const pendingsList: PendingSale[] = await getPendings()
        setPendings(pendingsList);
      } catch (error) {
        console.error("Error cargando configuración:", error)
      }
    }
    fetchPendings()
  }, [])

  const handleUpdatePayment = async (values: any, { resetForm }: any) => {
    console.log('Los valores son ', values);
    try {
      await updateSale(values);

      const newPendings = pendings?.filter((sale) => sale == values);
      setPendings(newPendings || []);

      resetForm();

      setMessage({ type: 'success', text: 'Pago actualizado exitosamente' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error actualizando pago:", error);
      setMessage({ type: 'error', text: 'Error al actualizar el pago' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center rounded-2xl" style={{ color: '#616d48' }}>Consultando...</div>;
  }
  if (!pendings) {
    return <div className="p-8 text-center rounded-2xl" style={{ color: '#616d48' }}>No hay ventas sin pagar...</div>;
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
          <Formik
            initialValues={pendings[0]!}
            validationSchema={pendingSaleSchema}
            onSubmit={handleUpdatePayment}
          >
            {({ values, setFieldValue, errors }) => {
              console.log('Errores ', errors);
              console.log('Values ', values);
              const hasErrors = Object.keys(errors).length > 0;
              return (
                <Form className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Venta</label>
                        <Field 
                          name="sale"
                          as="select" 
                          className="w-full p-2 border-2 rounded-md bg-white"
                          style={{ borderColor: '#fa9b71', color: '#616d48' }}
                          onChange={(e: any) => {
                            const sale: PendingSale = pendings!.filter((item) => {
                              const selectedId = e.target.value;
                              return item.id == selectedId;
                            })[0];
                            setFieldValue("product", sale.product);
                            setFieldValue("month", sale.month);
                            setFieldValue("row", sale.row);
                          }}
                        >
                          <option value="">-- Seleccionar --</option>
                          {pendings && pendings.map(item => (
                            <option key={item.id} value={item.id}>{item.client} - {item.product}</option>
                          ))}
                        </Field>
                      </div>

                
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Método de pago</label>
                    <Field as="select" name="paymentMethod" className="w-full p-2 border-2 rounded-md bg-white" style={{ borderColor: '#fa9b71', color: '#616d48' }}>
                      <option value="">-- Seleccionar --</option>
                      <option value="EFECTIVO">Efectivo</option>
                      <option value="TRANSFERENCIA">Transferencia</option>
                    </Field>
                  </div>
                

                  <button 
                    type="submit" 
                    disabled={hasErrors}
                    className="w-full text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                    style={{ backgroundColor: hasErrors ? '#999999' : '#616d48' }} 
                    onMouseEnter={(e) => { 
                      if (!hasErrors) {
                        (e.currentTarget as any).style.backgroundColor = '#fa9b71'; 
                        (e.currentTarget as any).style.boxShadow = '0 0 20px rgba(250, 155, 113, 0.5)'; 
                      }
                    }} 
                    onMouseLeave={(e) => { 
                      if (!hasErrors) {
                        (e.currentTarget as any).style.backgroundColor = '#616d48'; 
                        (e.currentTarget as any).style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'; 
                      }
                    }} 
                    onMouseDown={(e) => { 
                      if (!hasErrors) (e.currentTarget as any).style.transform = 'scale(0.98)'; 
                    }} 
                    onMouseUp={(e) => { 
                      if (!hasErrors) (e.currentTarget as any).style.transform = 'scale(1)'; 
                    }}
                  >
                    Guardar
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
