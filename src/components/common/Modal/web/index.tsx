import { TouchableOpacity, TouchableWithoutFeedback, Modal as RNModal, View } from 'react-native';

import { ModalProps } from '../types';
import { useStyles } from './styles';

export function Modal(props: ModalProps) {
  const { visible, setVisible, children, contentStyle } = props;

  const styles = useStyles();

  return (
    <TouchableOpacity onPress={setVisible.bind(null, false)}>
      <RNModal visible={visible} transparent>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={[styles.content, contentStyle]}>{children}</View>
          </TouchableWithoutFeedback>
        </View>
      </RNModal>
    </TouchableOpacity>
  );
}
