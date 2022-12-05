import { ComponentProps } from 'react';
import { Pressable, StyleProp, ViewStyle } from 'react-native';

import { Icon } from '../Icon';
import { useStyles } from './styles';

type IconProps = Pick<ComponentProps<typeof Icon>, 'set' | 'name' | 'size'>;

interface Props {
  onPress: () => void;
  icon: IconProps;
  style?: StyleProp<ViewStyle>;
}

export function IconButton(props: Props) {
  const { onPress, icon, style } = props;

  const styles = useStyles();

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Icon {...icon} />
    </Pressable>
  );
}
