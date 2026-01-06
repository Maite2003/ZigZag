'use client'

import { PendingSale, pendingSaleSchema } from "@/types/pendingSales";
import { updateSale } from "@/utils/api";
import { Field, Form, Formik } from "formik";
import { useState } from "react";


export function UpdateSaleForm({initialPendingSales}: { initialPendingSales: PendingSale[] }) {
  const [pendings, setPendings] = useState<PendingSale[]>(initialPendingSales);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdatePayment = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    try {
      await updateSale(values);

      const newPendings = pendings.filter((sale) => sale.id != values.id);
      setPendings(newPendings || []);

      resetForm();

      setMessage({ type: 'success', text: 'Pago actualizado exitosamente' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al actualizar el pago' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
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
        initialValues={{
          id: "",
          paymentMethod: "",
          price: 0,
          product: "",
          month: "",
          row: 0,
          client: "",
        }}
        validationSchema={pendingSaleSchema}
        onSubmit={handleUpdatePayment}
      >
        {({ setFieldValue, isValid, dirty }) => {
          return (
            <Form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Venta</label>
                    <Field 
                      name="id"
                      as="select" 
                      className="w-full p-2 border-2 rounded-md bg-white"
                      style={{ borderColor: '#fa9b71', color: '#616d48' }}
                      onChange={(e: any) => {
                        const selectedId = e.target.value;
                        const sale: PendingSale = pendings.find((item) => item.id == selectedId)!;
                        setFieldValue("product", sale.product);
                        setFieldValue("month", sale.month);
                        setFieldValue("row", sale.row);                      
                        setFieldValue("price", sale.price || 0);
                        setFieldValue("client", sale.client);  
                        setFieldValue('id', sale.id);
                      }}
                    >
                      <option value="">-- Seleccionar --</option>
                      {pendings && pendings.map(item => (
                        <option key={item.id} value={item.id}>{item.client} - {item.product}</option>
                      ))}
                    </Field>
                  </div>

            
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Método de pago</label>
                  <Field 
                    as="select" 
                    name="paymentMethod" 
                    className={`w-full p-2 border-2 rounded-md bg-white`}
                    style={{ borderColor: '#fa9b71', color: '#616d48' }}
                  >
                    <option value="">-- Seleccionar --</option>
                    <option value="EFECTIVO">Efectivo</option>
                    <option value="TRANSFERENCIA">Transferencia</option>
                  </Field>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Precio a Pagar ($)</label>
                  <Field 
                    type="number" 
                    name="price" 
                    className="w-full p-2 border-2 rounded-md bg-gray-100 cursor-not-allowed" 
                    style={{ borderColor: '#fa9b71', color: '#616d48' }}
                    placeholder="0"
                    min="0"
                    disabled
                  />
                </div>
              </div>
            

              <button 
                type="submit" 
                disabled={!isValid || !dirty || isLoading}
                className="w-full text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                style={{ backgroundColor: !isValid ? '#999999' : '#616d48', cursor: (!isValid || !dirty || isLoading) ? 'not-allowed' : 'pointer' }} 
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
                <div className="flex items-center justify-center gap-2">
                  {isLoading && (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  
                  {isLoading ? 'Actualizando...' : 'Actualizar'}
                </div>
              </button>
            </Form>
          )
        }}
      </Formik>
      
    </div>
  )
}