import { PropsWithChildren } from 'react';
import { Platform, SafeAreaView, StyleProp, View, ViewStyle } from 'react-native';

import { useStyles } from './styles';

interface Props {
  disablePaddings?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
}

function Container(props: PropsWithChildren<{ style: StyleProp<ViewStyle> }>) {
  const { style, children } = props;

  const styles = useStyles();

  const params = { children, style: [styles.container, style] };

  return Platform.OS === 'web' ? <View {...params} /> : <SafeAreaView {...params} />;
}

export function ScreenContainer(props: PropsWithChildren<Props>) {
  const { containerStyle, contentStyle, disablePaddings, children } = props;

  const styles = useStyles();

  return (
    <Container style={containerStyle}>
      <View style={[styles.content, !disablePaddings && styles.paddings, contentStyle]}>
        {children}
      </View>
    </Container>
  );
}
