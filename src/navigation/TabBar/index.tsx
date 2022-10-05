import { Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import { useStyles } from './styles';
import { theme } from '@utils/constants';

export const TabBar = (props: BottomTabBarProps) => {
  const { state, descriptors, navigation } = props;
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {state.routes.map(({ name, key }, i) => {
        const { options } = descriptors[key];
        const focused = state.index === i;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(name, { merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: key,
          });
        };

        return (
          <TouchableOpacity
            key={i}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.item, focused && styles.focused]}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused,
                color: focused ? theme.colors.orange : 'black',
                size: 30,
              })}
            <Text style={[focused && styles.focused]}>{name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
