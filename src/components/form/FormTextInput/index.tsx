import { ComponentProps } from 'react';
import { View } from 'react-native';

import { FormField } from 'miniva-common';

import { Spacer, TextInput, Typography } from '@components/common';

import { FormComponentProps, FormFieldProps } from '../types';
import { useStyles } from './styles';

type Props = FormComponentProps & ComponentProps<typeof TextInput>;

export function FormTextInput(props: Props) {
  const { name, label, error, control, ...rest } = props;

  const styles = useStyles();

  const renderInput = (field: Parameters<FormFieldProps['render']>[0]) => {
    const { value, onBlur, onChange } = field;

    return (
      <TextInput
        value={value}
        onBlur={onBlur}
        onChangeText={onChange}
        style={!!error && styles.error}
        {...rest}
      />
    );
  };

  return (
    <View>
      {label && (
        <>
          <Typography text={label} error={!!error} />
          <Spacer vertical={'xs'} />
        </>
      )}
      <FormField name={name} control={control} render={renderInput} />
      {!!error && <Typography error={!!error} text={error} style={styles.errorText} />}
    </View>
  );
}
