import { TouchableOpacity, View } from 'react-native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { Icon, Typography } from '@components/common';

import { useStyles } from './styles';

type Props = (BottomTabHeaderProps | NativeStackHeaderProps) & { canGoBack: boolean };

export function Header(props: Props) {
  const { route, canGoBack, navigation } = props;

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigation.goBack}
        hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
        style={[styles.backButton, !canGoBack && styles.hidden]}
      >
        <Icon set={'Feather'} name={'chevron-left'} size={25} style={styles.icon} />
      </TouchableOpacity>
      <Typography style={styles.text} text={route.name} />
    </View>
  );
}
