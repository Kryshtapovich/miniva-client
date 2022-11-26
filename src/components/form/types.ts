import { ComponentProps } from 'react';

import { FormField } from 'miniva-common';

export type FormFieldProps = ComponentProps<typeof FormField>;

export interface FormComponentProps {
  name: string;
  control: FormFieldProps['control'];
  label?: string;
  error?: string;
}
