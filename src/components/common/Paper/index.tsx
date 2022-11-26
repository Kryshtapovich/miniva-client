import { PropsWithChildren } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { useStyles } from './styles';

interface Props {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Paper(props: PropsWithChildren<Props>) {
  const { style, onPress, children } = props;

  const styles = useStyles();

  const content = <View style={[styles.container, style]}>{children}</View>;

  return onPress ? (
    <TouchableOpacity activeOpacity={0.6} onPress={onPress}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
}
