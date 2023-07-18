import { WarehouseProductInterface } from 'interfaces/warehouse-product';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface WarehouseInterface {
  id?: string;
  location: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  warehouse_product?: WarehouseProductInterface[];
  company?: CompanyInterface;
  _count?: {
    warehouse_product?: number;
  };
}

export interface WarehouseGetQueryInterface extends GetQueryInterface {
  id?: string;
  location?: string;
  company_id?: string;
}
