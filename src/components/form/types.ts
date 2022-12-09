import { ComponentProps } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { FormField } from './FormField';

export type FormFieldProps = ComponentProps<typeof FormField>;

export interface FormComponentProps {
  name: string;
  label?: string;
  error?: string;
  control: FormFieldProps['control'];
  containerStyle?: StyleProp<ViewStyle>;
}
