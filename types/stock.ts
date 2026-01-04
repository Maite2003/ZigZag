import * as Yup from "yup";

export interface Stock {
  model: string,
  fabric: string,
  timestamp: string
}

export const stockSchema = Yup.object().shape({
  model: Yup.string().min(2).required('El modelo es requerido'),
  fabric: Yup.string().required('La tela es requerida'),
  timestamp: Yup.string().required('La fecha es obligatoria')
})