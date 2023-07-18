import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createWarehouseProduct } from 'apiSdk/warehouse-products';
import { Error } from 'components/error';
import { warehouseProductValidationSchema } from 'validationSchema/warehouse-products';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { WarehouseInterface } from 'interfaces/warehouse';
import { ProductInterface } from 'interfaces/product';
import { getWarehouses } from 'apiSdk/warehouses';
import { getProducts } from 'apiSdk/products';
import { WarehouseProductInterface } from 'interfaces/warehouse-product';

function WarehouseProductCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WarehouseProductInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWarehouseProduct(values);
      resetForm();
      router.push('/warehouse-products');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WarehouseProductInterface>({
    initialValues: {
      quantity: 0,
      warehouse_id: (router.query.warehouse_id as string) ?? null,
      product_id: (router.query.product_id as string) ?? null,
    },
    validationSchema: warehouseProductValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Warehouse Product
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="quantity" mb="4" isInvalid={!!formik.errors?.quantity}>
            <FormLabel>Quantity</FormLabel>
            <NumberInput
              name="quantity"
              value={formik.values?.quantity}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.quantity && <FormErrorMessage>{formik.errors?.quantity}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<WarehouseInterface>
            formik={formik}
            name={'warehouse_id'}
            label={'Select Warehouse'}
            placeholder={'Select Warehouse'}
            fetcher={getWarehouses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.location}
              </option>
            )}
          />
          <AsyncSelect<ProductInterface>
            formik={formik}
            name={'product_id'}
            label={'Select Product'}
            placeholder={'Select Product'}
            fetcher={getProducts}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'warehouse_product',
    operation: AccessOperationEnum.CREATE,
  }),
)(WarehouseProductCreatePage);
