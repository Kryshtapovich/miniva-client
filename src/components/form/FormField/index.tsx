import { Control, Controller, ControllerRenderProps, FieldValues } from 'react-hook-form';

type FormFieldType = ControllerRenderProps<FieldValues, string>;

interface Props {
  name: string;
  control: Control<FieldValues, any>;
  render: (field: FormFieldType) => JSX.Element;
}

export function FormField(props: Props) {
  const { render, ...rest } = props;

  const renderField = ({ field }: { field: FormFieldType }) => {
    return render(field);
  };

  return <Controller render={renderField} {...rest} />;
}
