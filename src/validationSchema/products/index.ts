import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  name: yup.string().required(),
  traceability_code: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
