import { ComponentProps } from 'react';
import { View } from 'react-native';

import { Selector, Spacer, Typography } from '@components/common';

import { FormField } from '../FormField';
import { ErrorText } from '../ErrorText';
import { FormComponentProps, FormFieldProps } from '../types';
import { useStyles } from './styles';

type Props = FormComponentProps &
  Pick<ComponentProps<typeof Selector>, 'options' | 'placeholder' | 'style'>;

export function FormSelector(props: Props) {
  const { name, label, error, control, containerStyle, ...rest } = props;
  const styles = useStyles();

  const renderField = (field: Parameters<FormFieldProps['render']>[0]) => {
    const { onChange } = field;

    return (
      <Selector
        {...rest}
        onChange={onChange}
        style={{
          inputIOS: error ? styles.error : undefined,
          inputAndroid: error ? styles.error : undefined,
          icon: error ? styles.errorIcon : undefined,
        }}
      />
    );
  };

  return (
    <View style={containerStyle}>
      {label && (
        <>
          <Typography text={label} error={!!error} />
          <Spacer vertical={'xs'} />
        </>
      )}
      <FormField name={name} control={control} render={renderField} />
      <ErrorText error={error} />
    </View>
  );
}
