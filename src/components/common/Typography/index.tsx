import { Text, TextProps } from 'react-native';

import { useStyles } from './styles';

interface Props extends Omit<TextProps, 'children'> {
  text: string;
  error?: boolean;
}

export function Typography(props: Props) {
  const { text, error, style, ...rest } = props;

  const styles = useStyles();

  return (
    <Text style={[styles.container, error && styles.error, style]} {...rest}>
      {text}
    </Text>
  );
}
