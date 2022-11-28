import { PropsWithChildren, useEffect, useState } from 'react';
import { Keyboard, Platform, StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useStyles } from './styles';

interface Props {
  scrollEnabled?: boolean;
  showScrollBar?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function KeyboardContainer(props: PropsWithChildren<Props>) {
  const { children, style, scrollEnabled, showScrollBar } = props;

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
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={!!showScrollBar}
      contentContainerStyle={[styles.content, style]}
      extraScrollHeight={Platform.select({ android: -500 })}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
