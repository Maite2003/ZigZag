import * as Yup from 'yup';

export interface Product {
  id: string,
  model: string,
  fabric: string,
  photos: string[]
}

export const configStockSchema = Yup.object().shape({
  model: Yup.string().required(),
  fabric: Yup.string().required(),
  photos: Yup.array().of(Yup.string().url()).min(1).required()
});

export interface DataConfigType {
  models: string[],
  fabrics: string [],
  stock: Product[],
  pricePerModel: Record<string, number>,
}