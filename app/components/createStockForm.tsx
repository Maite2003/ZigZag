'use client'

import { DataConfigType } from "@/types/config"
import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, } from 'formik';
import { simpleStockSchema } from "@/types/basicStock";
import axios from "axios";
import { uploadImage } from "@/services/cloudinaryService";


export function CreateStockForm({ config }: { config: DataConfigType }) {
  const [dataConfig, setDataConfig] = useState<DataConfigType>(config);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      if (selectedFiles.length >= 2) {
        alert("Solo puedes subir un máximo de 2 fotos.");
        return;
      }
      setSelectedFiles([...selectedFiles, newFile]);
    }
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
  };

  const handleAddStock = async (values: any, { resetForm }: any) => {
    setIsLoading(true);
    try {

      // CLOUDINARY

      let imageUrls: string[] = [];

      if (selectedFiles.length > 0) {
        setMessage({ type: 'success', text: `Subiendo ${selectedFiles.length} fotos...` });
        imageUrls = await Promise.all(selectedFiles.map(file => uploadImage(file)));
      }

      const finalData = {
        ...values,
        photos: imageUrls
      }

      // N8N

      await axios.post('/api/stock', finalData);

      setMessage({ type: 'success', text: 'Producto agregado al stock exitosamente' })
      resetForm();
      setSelectedFiles([]);
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al agregar el producto' })
      setTimeout(() => setMessage(null), 3000)
    } finally {
      setIsLoading(false);
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
          validationSchema={simpleStockSchema}
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
                    <option value="" disabled hidden>-- Seleccionar Modelo --</option>
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
                    <option value="" disabled hidden>-- Seleccionar Tela --</option>
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

              <div className="border-2 border-dashed rounded-xl p-4" style={{ borderColor: '#fa9b71', backgroundColor: '#fff' }}>
                  <label className="block text-sm font-semibold mb-2" style={{ color: '#616d48' }}>
                    Fotos del Producto ({selectedFiles.length}/2)
                  </label>
                  
                  {selectedFiles.length < 2 && (
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                    />
                  )}

                  {selectedFiles.length > 0 && (
                    <div className="flex gap-4 mt-3">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
                            <img 
                              src={URL.createObjectURL(file)} 
                              alt="preview" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <button 
                  type="submit" 
                  disabled={!isValid || !dirty || isLoading || selectedFiles.length == 0}
                  className="w-full text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" 
                  style={{ backgroundColor: '#616d48', cursor: (!isValid || !dirty || isLoading || selectedFiles.length == 0) ? 'not-allowed' : 'pointer' }} 
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
                  
                  {isLoading ? 'Guardando...' : 'Guardar'}
                </div>
                </button>
              </Form>
            )
          }}
        </Formik>
      </div>
  );
}