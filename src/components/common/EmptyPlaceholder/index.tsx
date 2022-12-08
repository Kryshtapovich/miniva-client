import { ComponentProps } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { Icon, Typography } from '..';
import { useStyles } from './styles';

type IconProps = ComponentProps<typeof Icon>;

interface Props {
  text: string;
  icon: {
    set: IconProps['set'];
    name: IconProps['name'];
  };
  style?: StyleProp<ViewStyle>;
}

export function EmptyPlaceholder(props: Props) {
  const { text, icon, style } = props;

  const styles = useStyles();

  return (
    <View style={[styles.container, style]}>
      <Icon {...icon} size={50} />
      <Typography text={text} style={styles.text} />
    </View>
  );
}
