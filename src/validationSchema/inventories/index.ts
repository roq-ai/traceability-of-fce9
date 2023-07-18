import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  stock_level: yup.number().integer().required(),
  product_id: yup.string().nullable().required(),
  company_id: yup.string().nullable().required(),
});
