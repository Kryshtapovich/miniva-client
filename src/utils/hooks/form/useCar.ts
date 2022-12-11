import { object, string, number, array } from 'yup';

import { Car } from '@models';

import { useForm } from './useForm';

const validationSchema = object({
  model: string().required('Model is required'),
  engine_volume: number().required('Engine is required'),
  color: string().required('Color is required'),
  vin: string()
    .test({ test: (val) => val?.length === 17, message: 'VIN should include 17 characters' })
    .required('VIN is required'),
  hp: number()
    .typeError('Power should be a number')
    .integer('Power should be an integer number')
    .required('Power is required'),
  manufacturer: number().typeError('Manufacturer is required').required('Manufacturer is required'),
  price: number().typeError('Price should be a float number').required('Price is required'),
  car_photos: array()
    .of(string())
    .test({ test: (arr) => !!arr?.length, message: 'At least one photo is required' }),
});

export const useCarForm = (car?: Car) => {
  return useForm({ defaultValues: car, validationSchema });
};
