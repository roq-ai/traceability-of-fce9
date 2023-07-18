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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getWarehouseProductById, updateWarehouseProductById } from 'apiSdk/warehouse-products';
import { Error } from 'components/error';
import { warehouseProductValidationSchema } from 'validationSchema/warehouse-products';
import { WarehouseProductInterface } from 'interfaces/warehouse-product';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { WarehouseInterface } from 'interfaces/warehouse';
import { ProductInterface } from 'interfaces/product';
import { getWarehouses } from 'apiSdk/warehouses';
import { getProducts } from 'apiSdk/products';

function WarehouseProductEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<WarehouseProductInterface>(
    () => (id ? `/warehouse-products/${id}` : null),
    () => getWarehouseProductById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: WarehouseProductInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateWarehouseProductById(id, values);
      mutate(updated);
      resetForm();
      router.push('/warehouse-products');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<WarehouseProductInterface>({
    initialValues: data,
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
            Edit Warehouse Product
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(WarehouseProductEditPage);
