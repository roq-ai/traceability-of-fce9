import { ProductInterface } from 'interfaces/product';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface InventoryInterface {
  id?: string;
  product_id: string;
  stock_level: number;
  company_id: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  company?: CompanyInterface;
  _count?: {};
}

export interface InventoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  company_id?: string;
}
