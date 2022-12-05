import { ComponentProps } from 'react';
import { ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

import { theme } from '@utils/constants';

import { useStyles } from './styles';

interface Props {
  size?: ComponentProps<typeof ActivityIndicator>['size'];
  style?: StyleProp<ViewStyle>;
}

export function Spinner(props: Props) {
  const { size, style } = props;

  const styles = useStyles();

  return (
    <ActivityIndicator
      size={size || 'large'}
      color={theme.colors.orange}
      style={[styles.spinner, style]}
    />
  );
}
