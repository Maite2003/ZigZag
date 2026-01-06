import { DataConfigType } from '@/types/config';
import { PendingSale } from '@/types/pendingSales';
import { Sale } from '@/types/sales';
import axios from 'axios';

export async function getConfig() {
  try {
    const req = await axios.get('/api/config');
    const config: DataConfigType = req.data.config;
    return config;

  } catch (error) {
    throw new Error('Error con la api /config');
  }
}

export async function postSale(payload:Sale) {
  if (!payload) {
    throw new Error('No se puede registrar una venta vacia')
  }
  try {
    const req = await axios.post('/api/sales', payload);
    return req.data;
  } catch(error) {
    throw new Error('Error con la api /sales')
  }
}

export async function getPendings() {
  try {
    const req = await axios.get(`/api/sales/pendings`);
    const pendings: PendingSale[] = req.data.pendings;
    return pendings;
  } catch (error) {
    throw new Error('Error con la api /pendings');
  }
}

export async function updateSale(sale: PendingSale) {
  if (!sale) {
    throw new Error('Se debe seleccionar una venta para actualizar');
  }
  try {
    const req = await axios.put('/api/sales/pendings', sale);
    return req.data.sale;
  } catch(error) {
    throw new Error('Error con /sales/pendings');
  }
}