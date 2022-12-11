import { View } from 'react-native';

import { IconButton, Modal, Typography } from '@components/common';
import { useStore } from '@store';

import { CarFilterContent } from '../content';
import { useStyles } from './styles';
import { observer } from 'mobx-react-lite';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

function Component(props: Props) {
  const { visible, setVisible } = props;

  const { carsStore } = useStore();
  const { resetFilter } = carsStore;

  const styles = useStyles();

  return (
    <Modal visible={visible} setVisible={setVisible} contentStyle={styles.content}>
      <View style={styles.header}>
        <IconButton
          icon={{ set: 'Feather', name: 'x', size: 20 }}
          onPress={setVisible.bind(null, false)}
          style={styles.button}
        />
        <Typography text="Reset all" onPress={resetFilter} style={styles.resetText} />
      </View>
      <CarFilterContent onFilter={setVisible.bind(null, false)} />
    </Modal>
  );
}

export const CarFilterModal = observer(Component);
