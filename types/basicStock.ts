import * as Yup from "yup";

export interface SimpleStock {
  model: string,
  fabric: string,
  timestamp: string
}

export const simpleStockSchema = Yup.object().shape({
  model: Yup.string().min(2).required('El modelo es requerido'),
  fabric: Yup.string().required('La tela es requerida'),
  timestamp: Yup.string().required('La fecha es obligatoria')
})

export const backendStockSchema = simpleStockSchema.concat(
  Yup.object({
    photos: Yup.array()
      .of(Yup.string().url())
      .min(1, 'Debe haber al menos una foto')
      .required()
  })
);