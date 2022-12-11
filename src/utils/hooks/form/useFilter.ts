import { useEffect } from 'react';

import { CarFilter } from '@models';

import { useForm } from './useForm';

const defaultValues = {
  manufacturer: 0,
  model: '',
  hp_lt: 0,
  hp_gt: 0,
  price_lt: 0,
  price_gt: 0,
  engine_volume_lt: 0,
  engine_volume_gt: 0,
};

export const useCarFilter = (filter: CarFilter | null) => {
  const { reset, ...rest } = useForm({ defaultValues: filter || defaultValues });

  useEffect(() => {
    !filter && reset(defaultValues);
  }, [filter]);

  return rest;
};
