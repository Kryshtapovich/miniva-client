import { PropsWithChildren, useEffect, useState } from 'react';
import { Keyboard, StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useStyles } from './styles';

interface Props {
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function KeyboardContainer(props: PropsWithChildren<Props>) {
  const { children, style, scrollEnabled } = props;

  const [isScrollable, setIsScrollable] = useState(!!scrollEnabled);

  useEffect(() => {
    if (scrollEnabled === undefined) {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsScrollable(true));
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () =>
        setIsScrollable(false),
      );

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [scrollEnabled]);

  const styles = useStyles();

  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      scrollEnabled={isScrollable}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, style]}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
