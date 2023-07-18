import * as yup from 'yup';

export const warehouseValidationSchema = yup.object().shape({
  location: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
