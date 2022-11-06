import { PropsWithChildren, useEffect, useState } from 'react';
import { Keyboard, StyleProp, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export function KeyboardContainer(props: PropsWithChildren<Props>) {
  const { children, style } = props;

  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => setIsScrollable(true));
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => setIsScrollable(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <KeyboardAwareScrollView
      scrollEnabled={isScrollable}
      contentContainerStyle={style}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}
