import { theme } from '@utils/constants';
import { StatusBar } from 'react-native';
import ImageView from 'react-native-image-viewing';

import { Typography } from '../Typography';

import { useStyles } from './styles';

interface Props {
  index?: number;
  visible: boolean;
  onClose: () => void;
  images: Array<string>;
}

export function ImageViewer(props: Props) {
  const { images, index, onClose, visible } = props;

  const imageUrls = images.map((uri) => ({ uri }));

  const styles = useStyles();

  const getFooter = ({ imageIndex }: { imageIndex: number }) => {
    return <Typography text={`${imageIndex + 1} / ${images.length}`} style={styles.footer} />;
  };

  return (
    <>
      <StatusBar backgroundColor={theme.colors[visible ? 'text' : 'white']} />
      <ImageView
        visible={visible}
        images={imageUrls}
        imageIndex={index || 0}
        onRequestClose={onClose}
        FooterComponent={getFooter}
      />
    </>
  );
}
