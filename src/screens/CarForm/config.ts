import { KeyboardTypeOptions } from 'react-native';

import { Car } from '@models';

export interface Field {
  name: keyof Car;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
}

export const fields: Array<Field> = [
  {
    name: 'manufacturer',
    label: 'Manufacturer',
  },
  {
    name: 'model',
    label: 'Model',
    keyboardType: 'default',
  },
  {
    name: 'color',
    label: 'Color',
    keyboardType: 'default',
  },
  {
    name: 'vin',
    label: 'VIN',
    keyboardType: 'default',
  },
  {
    name: 'hp',
    label: 'Power',
    keyboardType: 'number-pad',
  },
  {
    name: 'engine_volume',
    label: 'Engine (ml)',
  },
  {
    name: 'price',
    label: 'Price ($)',
    keyboardType: 'numeric',
  },
  // {
  //   name: 'car_photos',
  // },
];
