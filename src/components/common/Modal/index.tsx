import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import RNModal from 'react-native-modal';

import { Spacer } from '../Spacer';
import { useStyles } from './styles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
}

export function Modal(props: PropsWithChildren<Props>) {
  const { isVisible: isVisbile, children, onClose } = props;

  const styles = useStyles();

  return (
    <RNModal
      hasBackdrop
      statusBarTranslucent
      isVisible={isVisbile}
      swipeDirection={'down'}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      style={styles.container}
    >
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
        <Spacer vertical={'s'} />
      </View>
      <View style={styles.content}>{children}</View>
    </RNModal>
  );
}
