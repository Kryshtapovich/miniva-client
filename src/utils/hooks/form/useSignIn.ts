import { object, string } from 'yup';

import { passwordSchema } from '@utils/validation';

import { useForm } from './useForm';

const defaultValues = {
  email: '',
  password: '',
};

const validationSchema = object({
  email: string().email('Should be a valid email').required('Email is required'),
  password: passwordSchema,
});

export const useSignInForm = () => {
  return useForm({ defaultValues, validationSchema });
};
