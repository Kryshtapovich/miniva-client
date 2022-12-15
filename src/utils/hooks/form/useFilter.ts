import { useEffect } from 'react';

import { CarFilter } from '@models';

import { useForm } from './useForm';

const defaultValues = {
  manufacturer__id: 0,
  model: '',
  hp__lt: 0,
  hp__gt: 0,
  price__lt: 0,
  price__gt: 0,
  engine_volume__lt: 0,
  engine_volume__gt: 0,
};

export const useCarFilter = (filter: CarFilter | null) => {
  const { reset, ...rest } = useForm({ defaultValues: filter || defaultValues });

  useEffect(() => {
    !filter && reset(defaultValues);
  }, [filter]);

  return rest;
};
