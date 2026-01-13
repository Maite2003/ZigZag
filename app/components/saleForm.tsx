"use client"

import { DataConfigType } from '@/types/config';
import { Sale, saleSchema } from '@/types/sales';
import { postSale } from '@/utils/api';
import { ErrorMessage, Field, Form, Formik, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const PriceAutoFiller = ({ dataConfig }: { dataConfig: DataConfigType }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const priceModel = values.model;
    
    if (priceModel && priceModel !== 'Otro') {
      const price = dataConfig.pricePerModel[priceModel] || 0;
      setFieldValue('price', price);
    }
  }, [values.model, values.isStock, dataConfig, setFieldValue]);

  return null;
};

export function SaleForm({ config } : { config: DataConfigType}) {
  const [dataConfig, setDataConfig] = useState<DataConfigType>(config);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    try {
      const photosURL = values.isStock
          ? dataConfig?.stock.find((i: { id: string; }) => i.id === values.stockId)?.photos
          : []

      const payload = {
        ...values,
        month: new Date().toLocaleString('es-ES', { month: 'long' }),
        photos: photosURL
      };

      await postSale(payload);
      
      if (values.isStock) {
        dataConfig!.stock = dataConfig!.stock.filter((item) => item.id !== values.stockId)
      }

      resetForm();

      setMessage({ type: 'success', text: 'Venta registrada exitosamente' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al registrar la venta' });
      setTimeout(() => setMessage(null), 3000);
    } finally {
      setIsLoading(false);
    }
  }   

  return (
    
    <div className="max-w-lg mx-auto m-8 p-6 rounded-2xl shadow-xl border-2" style={{ backgroundColor: '#fff5f0', borderColor: '#fa9b71' }}>
      <header className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: '#616d48' }}>ZigZag</h1>
        <p className="text-sm" style={{ color: '#fa9b71' }}>Registro de ventas y encargos</p>
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
          stockId: '',
          buyer: '',
          isStock: false,
          model: '',
          fabric: '',
          price: 0,
          status: 'PAGO',
          paymentMethod: 'EFECTIVO',
          notes: '',
          timestamp: new Date().toISOString().split('T')[0]
        }}
        validationSchema={saleSchema}
        onSubmit={handleOnSubmit}
      >
        {({ values, setFieldValue, isValid, dirty }) => {
          const isStatusPendiente = values.status === 'PENDIENTE';
          return (
            <Form className="space-y-4">
              <PriceAutoFiller dataConfig={dataConfig} />

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Fecha</label>
                <Field name="timestamp" type="date" className="w-full p-2 border-2 rounded-md bg-white" style={{ borderColor: '#fa9b71', color: '#616d48' }} />
                <ErrorMessage name="timestamp" component="div" className="text-xs mt-1" />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border-2 shadow-sm bg-white" style={{ borderColor: '#fa9b71' }}>
                <span className="font-medium" style={{ color: '#616d48' }}>¿Es de Stock?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={values.isStock}
                    className="sr-only peer " 
                    onChange={(e) => {
                      setFieldValue('isStock', e.target.checked);
                      setFieldValue('model', '');
                      setFieldValue('fabric', '');
                    }} 
                  />
                  <div className="w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ backgroundColor: '#fa9b71' }}></div>
                  <style>{`input[type="checkbox"]:checked + div { background-color: #616d48 !important; }`}</style>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Cliente</label>
                <Field name="buyer" className="w-full p-2 border-2 rounded-md bg-white" placeholder="Nombre del cliente" style={{ borderColor: '#fa9b71', color: '#616d48' }} />
                <style>{`input[name="buyer"]::placeholder { color: #fa9b71; opacity: 1; }`}</style>
                <ErrorMessage name="buyer" component="div" className="text-xs mt-1" />
              </div>

              <div className="grid grid-cols-1 gap-4">
                {values.isStock ? (
                  <div>
                    <label className="block text-sm font-semibold mb-1 " style={{ color: '#616d48' }}>Producto disponible</label>
                    <Field 
                      name="stockId"
                      as="select" 
                      className="w-full p-2 border-2 rounded-md bg-white"
                      style={{ borderColor: '#fa9b71', color: '#616d48' }}
                      onChange={(e: any) => {
                        const selectedId = e.target.value;
                        setFieldValue("stockId", selectedId);

                        // Get stock item selected
                        const selectedItem = dataConfig?.stock.find((i: any) => i.id === selectedId);

                        if (selectedItem) {
                          setFieldValue("model", selectedItem.model); // set model selected
                          setFieldValue("fabric", selectedItem.fabric); // set fabric selected
                          
                          const precio = dataConfig?.pricePerModel[selectedItem.model] || 0;
                          setFieldValue("price", precio);
                        }
                      }}
                    >
                      <option value="">-- Seleccionar del Stock --</option>
                      {dataConfig.stock.map(item => (
                        <option key={item.id} value={item.id}>{item.model} | {item.fabric}</option>
                      ))}
                    </Field>
                    {values.stockId && (
                      (() => {
                        const selected = dataConfig.stock.find((i: any) => i.id === values.stockId);
                        let photoUrl = '/placeholder.png';
                        if (selected?.photos) {
                          photoUrl = selected.photos[0];
                        }

                        return selected ? (
                          <div className="mt-3 p-3 border rounded-xl flex items-center gap-4 animate-fadeIn" style={{background: "#fff5f0", borderColor: "#fa9b71"}}>
                            <img 
                              src={photoUrl} 
                              alt="Vista previa" 
                              className="w-16 h-16 rounded-lg object-cover border shadow-sm"
                              style={{borderColor: "#fa9b71"}}
                            />
                            <div>
                              <p className="text-sm font-bold text-gray-700" style={{color: "#fa9b71"}}>Has seleccionado:</p>
                              <p className="text-xs" style={{color: "#616d48"}}>{selected.model} - {selected.fabric}</p>
                            </div>
                          </div>
                        ) : null;
                      })()
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Modelo</label>
                      <Field as="select" name="model" className="w-full p-2 border-2 rounded-md bg-white" style={{ borderColor: '#fa9b71', color: '#616d48' }}>
                        <option value="" disabled hidden>-- Modelo --</option>
                        {dataConfig.models.map(m => <option key={m} value={m}>{m}</option>)}
                      </Field>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Tela</label>
                      <Field as="select" name="fabric" className="w-full p-2 border-2 rounded-md bg-white" style={{ borderColor: '#fa9b71', color: '#616d48' }}>
                        <option value="" disabled hidden>-- Tela --</option>
                        {dataConfig.fabrics.map(t => <option key={t} value={t}>{t}</option>)}
                      </Field>
                    </div>
                  </div>
                )}
                <ErrorMessage name="model" component="div" className="text-xs" />
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-lg border-2" style={{ backgroundColor: '#fff5f0', borderColor: '#fa9b71' }}>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Precio Total ($)</label>
                  <Field name="price" type="number" className="w-full p-2 border-2 rounded-md" style={{ borderColor: '#fa9b71' }} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Estado</label>
                  <Field 
                    as="select" 
                    name="status" 
                    className="w-full p-2 border-2 rounded-md bg-white" 
                    style={{ borderColor: '#fa9b71', color: '#616d48' }}
                    onChange={(e : any) => {
                      const selected = e.target.value;
                      if (selected == 'PENDIENTE') {
                        setFieldValue('paymentMethod', '');
                      }
                      setFieldValue('status', selected);
                    }}>
                    <option value="PAGO">Pago</option>
                    <option value="PENDIENTE">Pendiente</option>
                  </Field>
                </div>
              </div>

            
              <div>
                <label className="block text-sm font-semibold mb-1 " style={{ color: '#616d48' }}>Método de pago</label>
                <Field 
                    as="select" 
                    name="paymentMethod" 
                    className={`w-full p-2 border-2 rounded-md  ${isStatusPendiente ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                    style={{ backgroundColor: `${isStatusPendiente ? '#fff5f0' : 'white'}`, borderColor: '#fa9b71', color: '#616d48' }}
                    disabled={isStatusPendiente}
                  >
                  <option value="EFECTIVO">Efectivo</option>
                  <option value="TRANSFERENCIA">Transferencia</option>
                </Field>
              </div>
            

              <div>
                <label className="block text-sm font-semibold mb-1" style={{ color: '#616d48' }}>Notas adicionales</label>
                <Field as="textarea" name="notes" rows={2} className="w-full p-2 border-2 rounded-md bg-white" style={{ borderColor: '#fa9b71', color: '#616d48' }} placeholder="Detalles de costura o deudas..." />
                <style>{`textarea[name="notes"]::placeholder { color: #fa9b71; opacity: 1; }`}</style>
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
                  
                  {isLoading ? 'Procesando...' : 'Guardar'}
                </div>
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}