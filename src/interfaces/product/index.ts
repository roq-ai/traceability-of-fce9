import { InventoryInterface } from 'interfaces/inventory';
import { WarehouseProductInterface } from 'interfaces/warehouse-product';
import { CompanyInterface } from 'interfaces/company';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  traceability_code: string;
  company_id: string;
  created_at?: any;
  updated_at?: any;
  inventory?: InventoryInterface[];
  warehouse_product?: WarehouseProductInterface[];
  company?: CompanyInterface;
  _count?: {
    inventory?: number;
    warehouse_product?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  traceability_code?: string;
  company_id?: string;
}
