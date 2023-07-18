import * as yup from 'yup';

export const warehouseProductValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  warehouse_id: yup.string().nullable().required(),
  product_id: yup.string().nullable().required(),
});
