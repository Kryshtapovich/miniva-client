import { ComponentProps } from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { Icon } from '../Icon';
import { Spacer } from '../Spacer';
import { Typography } from '../Typography';
import { useStyles } from './styles';

type IconProps = Pick<ComponentProps<typeof Icon>, 'set' | 'name'>;

interface Props {
  label: string;
  onPress: () => void;
  icon: IconProps;
  style?: StyleProp<ViewStyle>;
}

export function IconButton(props: Props) {
  const { label, onPress, icon, style } = props;

  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5} style={[styles.container, style]}>
      <Icon {...icon} size={20} style={styles.icon} />
      <Spacer horizontal={'xxs'} />
      <Typography text={label} style={styles.label} />
    </TouchableOpacity>
  );
}
