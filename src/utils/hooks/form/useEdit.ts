import { object, string, ValidationError } from 'yup';

import { passwordSchema } from '@utils/validation';
import { User } from '@models';

import { useForm } from './useForm';

const validationSchema = object({
  username: string().min(1, "Username shouldn't be empty"),
  email: string().min(1, "Email shouldn't be empty").email('Should be a valid email'),
  password: string().test(async (value) => {
    if (value?.length === 0) return true;
    try {
      await passwordSchema.validate(value);
      return true;
    } catch (e) {
      return { ...(e as ValidationError), path: 'password' };
    }
  }),
});

export const useEditUser = (user: User | null) => {
  const defaultValues = {
    email: user?.email || '',
    username: user?.username || '',
    password: '',
  };

  return useForm({ defaultValues, validationSchema });
};
