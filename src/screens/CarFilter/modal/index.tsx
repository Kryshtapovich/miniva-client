import { View } from 'react-native';

import { Button, IconButton, Modal, Typography } from '@components/common';

import { CarFilterContent } from '../content';
import { useStyles } from './styles';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export function CarFilterModal(props: Props) {
  const { visible, setVisible } = props;

  const styles = useStyles();

  return (
    <Modal visible={visible} setVisible={setVisible} contentStyle={styles.content}>
      <View style={styles.header}>
        <IconButton
          icon={{ set: 'Feather', name: 'x', size: 20 }}
          onPress={setVisible.bind(null, false)}
          style={styles.button}
        />
        <Typography text="Reset all" onPress={Promise.resolve} style={styles.resetText} />
      </View>
      <CarFilterContent />
      <Button label="Filter" onPress={Promise.resolve} />
    </Modal>
  );
}
