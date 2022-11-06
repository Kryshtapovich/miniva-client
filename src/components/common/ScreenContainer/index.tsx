import { PropsWithChildren } from 'react';
import { SafeAreaView, StyleProp, View, ViewStyle } from 'react-native';

import { useStyles } from './styles';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

export function ScreenContainer(props: PropsWithChildren<Props>) {
  const { containerStyle, contentStyle, children } = props;

  const styles = useStyles();

  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </SafeAreaView>
  );
}
