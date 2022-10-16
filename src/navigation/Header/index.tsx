import { View } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { Typography } from '@components/common';

import { useStyles } from './styles';

export function Header(props: BottomTabHeaderProps | NativeStackHeaderProps) {
  const { route } = props;

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Typography style={styles.text} text={route.name} />
    </View>
  );
}
