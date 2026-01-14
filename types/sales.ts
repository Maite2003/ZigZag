import * as Yup from "yup";

export interface Sale {
  stockId?: string;
  timestamp: string;
  buyer: string;
  model: string;
  fabric: string,
  isStock: boolean;
  price: number;
  
  status: 'PAGO' | 'PENDIENTE'; 
  paymentMethod?: 'EFECTIVO' | 'TRANSFERENCIA';
  notes?: string;
}

export const saleSchema = Yup.object().shape({
  stockId: Yup.string().optional(),

  timestamp: Yup.string()
    .required('La fecha es obligatoria'),

  buyer: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('Debes ingresar el nombre de la clienta'),

  model: Yup.string().required('El modelo es obligatorio'),
  
  fabric: Yup.string().required('La tela es obligatoria'),

  isStock: Yup.boolean(),

  price: Yup.number()
    .typeError('El precio debe ser un número')
    .min(0, 'El precio debe ser mayor a 0')
    .required('El precio es obligatorio'),

  status: Yup.mixed<'PAGO' | 'PENDIENTE'>()
    .oneOf(['PAGO', 'PENDIENTE'])
    .required('El estado de pago es obligatorio'),

  paymentMethod: Yup.string()
    .when('status', {
      is: (status: string) => status === 'PAGO',
      then: (schema) => schema
        .oneOf(['EFECTIVO', 'TRANSFERENCIA'])
        .required('Selecciona cómo pagó'),
      otherwise: (schema) => schema
        .oneOf([''])
        .optional(),
    }),

  notes: Yup.string()
    .max(200, 'La nota es muy larga')
    .optional(),
});
