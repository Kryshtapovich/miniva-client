import { ComponentProps } from 'react';
import { View } from 'react-native';

import { FormField } from 'miniva-common';

import { Selector, Spacer, Typography } from '@components/common';

import { FormComponentProps, FormFieldProps } from '../types';
import { useStyles } from './styles';

interface Props extends FormComponentProps {
  options: ComponentProps<typeof Selector>['options'];
}

export function FormSelector(props: Props) {
  const { name, label, error, control, options } = props;

  const styles = useStyles();

  const renderInput = (field: Parameters<FormFieldProps['render']>[0]) => {
    const { onChange } = field;

    return (
      <Selector
        options={options}
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
