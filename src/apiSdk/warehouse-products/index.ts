import axios from 'axios';
import queryString from 'query-string';
import { WarehouseProductInterface, WarehouseProductGetQueryInterface } from 'interfaces/warehouse-product';
import { GetQueryInterface } from '../../interfaces';

export const getWarehouseProducts = async (query?: WarehouseProductGetQueryInterface) => {
  const response = await axios.get(`/api/warehouse-products${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWarehouseProduct = async (warehouseProduct: WarehouseProductInterface) => {
  const response = await axios.post('/api/warehouse-products', warehouseProduct);
  return response.data;
};

export const updateWarehouseProductById = async (id: string, warehouseProduct: WarehouseProductInterface) => {
  const response = await axios.put(`/api/warehouse-products/${id}`, warehouseProduct);
  return response.data;
};

export const getWarehouseProductById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/warehouse-products/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWarehouseProductById = async (id: string) => {
  const response = await axios.delete(`/api/warehouse-products/${id}`);
  return response.data;
};
