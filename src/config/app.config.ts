interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Inventory Manager', 'Product Manager', 'Warehouse Supervisor'],
  tenantName: 'Company',
  applicationName: 'Traceability of agricultural seeds',
  addOns: ['chat', 'file', 'notifications'],
};
