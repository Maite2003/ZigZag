import { dataConfigType } from '@/types/config';
import { Sale } from '@/types/sales';
import axios from 'axios';

export async function getConfig() {
  try {
    const req = await axios.get('/api/config');
    const config: dataConfigType = req.data.config;
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
    const req = await axios.post('/api/sale', payload);
    return req.data;
  } catch(error) {
    throw new Error('Error con la api /sale')
  }
}