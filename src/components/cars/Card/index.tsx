import { memo } from 'react';
import { Pressable, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Car } from 'miniva-common';

import { Icon, Spacer } from '@components/common';
import { theme } from '@utils/constants';

import { useStyles } from './styles';

interface Props {
  car: Car;
  style?: StyleProp<ViewStyle>;
  toggleFavorite: (id: number) => void;
}

function Component(props: Props) {
  const { car, toggleFavorite, style } = props;
  const { id, manufacturer, model, year, price, isFavorite } = car;

  const styles = useStyles();

  const handlePress = () => {
    toggleFavorite(id);
  };

  return (
    <TouchableOpacity style={[styles.container, style]}>
      <View style={styles.spacedRow}>
        <View style={styles.title}>
          <Text style={styles.mainInfo}>{manufacturer}</Text>
          <Spacer horizontal={'xs'} />
          <Text style={styles.mainInfo}>{model}</Text>
        </View>
        <Pressable hitSlop={30} onPress={handlePress}>
          <Icon
            set={'FontAwesome'}
            name={isFavorite ? 'star' : 'star-o'}
            size={25}
            color={theme.colors.gold}
          />
        </Pressable>
      </View>
      <Spacer vertical={'s'} />
      <View style={styles.image} />
      <Spacer vertical={'s'} />
      <View style={styles.spacedRow}>
        <Text>{year}</Text>
        <Text style={styles.mainInfo}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const CarCard = memo(Component);
