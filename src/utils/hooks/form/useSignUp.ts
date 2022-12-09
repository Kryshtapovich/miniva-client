import { object, string } from 'yup';

import { passwordSchema } from '@utils/validation';

import { useForm } from './useForm';

const defaultValues = {
  username: '',
  email: '',
  password: '',
};

const validationSchema = object({
  username: string().required('Username is required'),
  email: string().email('Should be a valid email').required('Email is required'),
  password: passwordSchema,
});

export const useSignUpForm = () => {
  return useForm({ defaultValues, validationSchema });
};
