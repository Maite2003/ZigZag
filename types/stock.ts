import * as Yup from "yup";

export interface stock {
  model: string,
  fabric: string,
  timestamp: Date
}

export const stockSchema = Yup.object().shape({
  model: Yup.string().required('El modelo es requerido'),
  fabric: Yup.string().required('La tela es requerida'),
  timestamp: Yup.string().required('La fecha es obligatoria')
})