import { string } from 'yup';

export const passwordSchema = string()
  .required('Password is required')
  .min(8, 'Password length should be at least 8 symbols')
  .matches(/[a-z]/, 'Password should has at least one lower case letter')
  .matches(/[A-Z]/, 'Password should has at least one upper case letter')
  .matches(/\d/, 'Password should has at least one digit')
  .matches(/[!?@#$%^&*)(+=:;.|\\/,`~_-]/, 'Password should has at least one special symbol');
