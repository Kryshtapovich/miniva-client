import { Pressable } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { observer } from 'mobx-react-lite';

import { Divider, Modal, Spacer, Typography } from '@components/common';
import { Reviewer } from '@models';

import { useStyles } from './styles';

interface Props {
  visible: boolean;
  reviewers: Array<Reviewer>;
  setVisible: (value: boolean) => void;
}

function Component(props: Props) {
  const { visible, reviewers, setVisible } = props;

  const styles = useStyles();

  const renderItem = ({ item }: { item: Reviewer }) => {
    const { username, email } = item;

    return (
      <Pressable style={styles.reviewer}>
        <Typography text={username} style={styles.username} />
        <Spacer horizontal={'xs'} />
        <Typography text={email} style={styles.email} />
      </Pressable>
    );
  };

  const renderSeparator = () => {
    return <Divider vertical={'s'} />;
  };

  return (
    <Modal visible={visible} setVisible={setVisible} contentStyle={styles.container}>
      <FlashList
        data={reviewers}
        estimatedItemSize={10}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
      />
    </Modal>
  );
}

export const ReviewersModal = observer(Component);
