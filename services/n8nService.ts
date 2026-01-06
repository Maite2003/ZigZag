import { DataConfigType } from '@/types/config';
import { PendingSale } from '@/types/pendingSales';
import { Sale } from '@/types/sales';
import { Stock } from '@/types/stock';
import axios from 'axios';

const BASE_URL = process.env.N8N_BASE_URL;
const URLS = {
  GET_CONFIG: `${BASE_URL}/webhook/32305e74-4494-4131-b77e-0f87da09d82b`,
  GET_PENDINGS: `${BASE_URL}/webhook/b88ec717-d639-4c0c-aec4-98f7a3e3bec2`,
  UPDATE_SALE: `${ BASE_URL}/webhook/6c10d42d-9225-4c3f-ad62-210fc7933f20`,
  POST_SALE: `${BASE_URL }/webhook/d6d05ef7-a4a2-49b4-9474-e575724bb4aa`,
  POST_STOCK: `${BASE_URL}/webhook/dd8babcc-9854-4f03-81c7-74059adc7503`,
}

export async function getConfig() {
  const req = await axios.get(URLS.GET_CONFIG);
  if (req.status !== 200 || !req.data) {
    throw new Error('Error con la api /config');
  }
  const config: DataConfigType = req.data;
  const rawPrices = config.pricePerModel || {};
  const modelsList = [...Object.keys(rawPrices), "Otro"];
  config["models"] = modelsList;
  return config;
}

export async function postSale(payload:Sale) {
  if (!payload) {
    throw new Error('No se puede registrar una venta vacia')
  }
  const req = await axios.post(URLS.POST_SALE, payload);
  if (req.status !== 200) {
    throw new Error('Error creando la nueva venta');
  }
  return req.data;
}

export async function getPendings() {
  const req = await axios.get(URLS.GET_PENDINGS);
  if (req.status !== 200) {
    throw new Error('Error con la api /pendings');
  }
  const pendings: PendingSale[] = req.data.pendings;
  return pendings;
}

export async function updateSale(sale: PendingSale) {
  if (!sale) {
    throw new Error('Se debe seleccionar una venta para actualizar');
  }
  const req = await axios.put(URLS.UPDATE_SALE, sale);
  if (req.status !== 200) {
    throw new Error('Error con /sales/pendings');
  }
  return req.data;
}

export async function postStock(stock: Stock) {
  if (!stock) {
    throw new Error('No se puede registrar un producto vacio');
  }
  const req = await axios.post(URLS.POST_STOCK, stock);
  if (req.status !== 200) {
    throw new Error('Error creando el nuevo producto');
  }
  return req.data;
}