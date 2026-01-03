import * as Yup from "yup";

export interface PendingSale {
  id: string,
  product: string,
  month: string,
  row: string,
  client: string,
  date: string,
  price: string,
  paymentMethod?: string,
}

export const pendingSaleSchema = Yup.object().shape({
  product: Yup.string().required(),
  month: Yup.string()
  .oneOf(['ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO', 'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE'])
  .required(),
  row: Yup.string().required(),
  client: Yup.string().required(),
  paymentMethod: Yup.string()
  .oneOf(['EFECTIVO', 'TRANSFERENCIA'])
  .required(),
});
