import { TextInput as RNTextInput, TextInputProps } from 'react-native';

import { useStyles } from './styles';

export function TextInput(props: TextInputProps) {
  const { style, ...rest } = props;

  const styles = useStyles();

  return <RNTextInput autoCapitalize={'none'} {...rest} style={[styles.container, style]} />;
}
