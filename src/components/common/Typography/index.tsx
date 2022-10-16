import { Text, TextProps } from 'react-native';

import { useStyles } from './styles';

interface Props extends Omit<TextProps, 'children'> {
  text: string;
}

export function Typography(props: Props) {
  const { text, style, ...rest } = props;

  const styles = useStyles();

  return (
    <Text style={[styles.container, style]} {...rest}>
      {text}
    </Text>
  );
}
