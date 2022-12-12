import { View } from 'react-native';
import RNModal from 'react-native-modal';

import { Spacer } from '@components/common';

import { ModalProps } from '../types';
import { useStyles } from './styles';

export function Modal(props: ModalProps) {
  const { visible, children, setVisible, contentStyle } = props;

  const styles = useStyles();

  return (
    <RNModal
      hasBackdrop
      propagateSwipe
      isVisible={visible}
      statusBarTranslucent
      swipeDirection={'down'}
      style={styles.container}
      onBackdropPress={setVisible.bind(null, false)}
      onSwipeComplete={setVisible.bind(null, false)}
    >
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
        <Spacer vertical={'s'} />
      </View>
      <View style={[styles.content, contentStyle]}>{children}</View>
    </RNModal>
  );
}
