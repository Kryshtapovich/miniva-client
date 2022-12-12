import { ComponentProps } from 'react';
import { Pressable, StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Icon } from '../Icon';
import { useStyles } from './styles';

type IconProps = Pick<ComponentProps<typeof Icon>, 'set' | 'name' | 'size' | 'color'>;

interface Props {
  onPress: () => void;
  icon: IconProps;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>;
}

export function IconButton(props: Props) {
  const { onPress, icon, style, iconStyle } = props;

  const styles = useStyles();

  return (
    <Pressable onPress={onPress} style={[styles.container, style]}>
      <Icon {...icon} style={iconStyle} />
    </Pressable>
  );
}
