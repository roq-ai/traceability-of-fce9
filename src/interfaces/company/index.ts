import { InventoryInterface } from 'interfaces/inventory';
import { ProductInterface } from 'interfaces/product';
import { WarehouseInterface } from 'interfaces/warehouse';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CompanyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  inventory?: InventoryInterface[];
  product?: ProductInterface[];
  warehouse?: WarehouseInterface[];
  user?: UserInterface;
  _count?: {
    inventory?: number;
    product?: number;
    warehouse?: number;
  };
}

export interface CompanyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
