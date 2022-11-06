import { theme } from '@utils/constants';
import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

import { Typography } from '../Typography';
import { useStyles } from './styles';

interface Props {
  loading?: boolean;
  disabled?: boolean;
  label: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Button(props: Props) {
  const { loading, disabled, label, onPress, style } = props;

  const styles = useStyles();

  const handlePress = () => {
    !loading && !disabled && onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.5} style={[styles.container, style]}>
      <Typography text={label} style={[styles.label, loading && styles.hidden]} />
      <ActivityIndicator style={!loading && styles.hidden} color={theme.colors.white} />
    </TouchableOpacity>
  );
}
