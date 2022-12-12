import { TouchableOpacity } from 'react-native';

import { FlashList } from '@shopify/flash-list';

import { Divider, Modal, Spacer, Typography } from '@components/common';
import { Reviewer } from '@models';

import { useStyles } from './styles';

interface Props {
  visible: boolean;
  reviewers: Array<Reviewer>;
  setVisible: (value: boolean) => void;
  onReviewerPressed: (reviewer: Reviewer) => void;
}

export function ReviewersModal(props: Props) {
  const { visible, reviewers, setVisible, onReviewerPressed } = props;

  const styles = useStyles();

  const renderItem = ({ item }: { item: Reviewer }) => {
    const { username, email } = item;

    return (
      <TouchableOpacity style={styles.reviewer} onPress={onReviewerPressed.bind(null, item)}>
        <Typography text={username} style={styles.username} />
        <Spacer horizontal={'xs'} />
        <Typography text={email} style={styles.email} />
      </TouchableOpacity>
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
