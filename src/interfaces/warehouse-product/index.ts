import { WarehouseInterface } from 'interfaces/warehouse';
import { ProductInterface } from 'interfaces/product';
import { GetQueryInterface } from 'interfaces';

export interface WarehouseProductInterface {
  id?: string;
  warehouse_id: string;
  product_id: string;
  quantity: number;
  created_at?: any;
  updated_at?: any;

  warehouse?: WarehouseInterface;
  product?: ProductInterface;
  _count?: {};
}

export interface WarehouseProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  warehouse_id?: string;
  product_id?: string;
}
