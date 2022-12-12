import { Modal } from '@components/common';

import { EditUserContent } from '../content';

interface Props {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export function EditUserModal(props: Props) {
  const { visible, setVisible } = props;

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <EditUserContent onSubmit={setVisible.bind(null, false)} />
    </Modal>
  );
}
