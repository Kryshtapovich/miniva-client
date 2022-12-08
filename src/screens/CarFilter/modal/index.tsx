import { Button, Modal, Typography } from '@components/common';

import { CarFilterContent } from '../content';
import { useStyles } from './styles';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export function CarFilterModal(props: Props) {
  const styles = useStyles();

  return (
    <Modal {...props}>
      <Typography text="Reset all" onPress={Promise.resolve} style={styles.resetText} />
      <CarFilterContent />
      <Button label="Filter" onPress={Promise.resolve} />
    </Modal>
  );
}
