const mapping: Record<string, string> = {
  companies: 'company',
  inventories: 'inventory',
  products: 'product',
  users: 'user',
  warehouses: 'warehouse',
  'warehouse-products': 'warehouse_product',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
