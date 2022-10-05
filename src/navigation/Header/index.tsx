import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';

import { useStyles } from './styles';

export const Header = (props: BottomTabHeaderProps | NativeStackHeaderProps) => {
  const { route } = props;

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{route.name}</Text>
    </View>
  );
};
