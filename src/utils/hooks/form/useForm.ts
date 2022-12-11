import { useMemo } from 'react';
import { useForm as useFormLib } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface Params<T> {
  defaultValues?: T;
  validationSchema?: any;
}

export const useForm = <T extends Record<string, any> | undefined>({
  defaultValues,
  validationSchema,
}: Params<T>) => {
  const { formState, register, control, handleSubmit, reset } = useFormLib({
    defaultValues,
    resolver: validationSchema && yupResolver(validationSchema),
  });

  const errors = useMemo(() => {
    return Object.entries(formState.errors).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value?.message }),
      {} as Record<keyof T, string>,
    );
  }, [formState]);

  const onSubmit = (submitCallback: (data: T) => void) => {
    return handleSubmit((values) => submitCallback(values as T));
  };

  return { errors, register, control, onSubmit, reset };
};
