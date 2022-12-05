import { ComponentProps } from 'react';
import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { theme } from '@utils/constants';

import { Icon } from '../Icon';
import { Spacer } from '../Spacer';
import { Typography } from '../Typography';
import { useStyles } from './styles';

type IconProps = Pick<ComponentProps<typeof Icon>, 'set' | 'name'>;

interface Props {
  icon?: IconProps;
  loading?: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Button(props: Props) {
  const { loading, disabled, icon, label, onPress, style } = props;

  const styles = useStyles();

  const handlePress = () => {
    !loading && !disabled && onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.5}
      style={[styles.container, icon && styles.withIcon, style]}
    >
      {!!icon && !loading && (
        <>
          <Icon {...icon} size={20} style={styles.icon} />
          <Spacer horizontal={'xxs'} />
        </>
      )}
      <Typography text={label} style={[styles.label, loading && styles.hidden]} />
      <ActivityIndicator style={!loading && styles.hidden} color={theme.colors.white} />
    </TouchableOpacity>
  );
}
