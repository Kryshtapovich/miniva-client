import { memo } from 'react';
import { Pressable, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

import { Car } from 'miniva-common';

import { Icon, Spacer, Typography } from '@components/common';
import { theme } from '@utils/constants';
import { showMessage } from '@utils/helpers';

import { useStyles } from './styles';

interface Props {
  car: Car;
  style?: StyleProp<ViewStyle>;
  toggleFavorite: (id: number) => Promise<void>;
}

function Component(props: Props) {
  const { car, toggleFavorite, style } = props;
  const { id, manufacturer, model, year, price, isFavorite } = car;

  const styles = useStyles();

  const handlePress = async () => {
    try {
      await toggleFavorite(id);
      showMessage({
        type: 'success',
        message: `Car has been successfully ${isFavorite ? 'removed from' : 'added to'} favorites`,
      });
    } catch {
      showMessage({
        type: 'error',
        message: `An error occured while ${isFavorite ? 'removing from' : 'adding to'} favorites`,
      });
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.6} style={[styles.container, style]}>
      <View style={styles.spacedRow}>
        <View style={styles.title}>
          <Typography style={styles.mainInfo} text={manufacturer} />
          <Spacer horizontal={'xs'} />
          <Typography style={styles.mainInfo} text={model} />
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
        <Typography style={styles.year} text={year.toString()} />
        <Typography style={styles.mainInfo} text={`${price} $`} />
      </View>
    </TouchableOpacity>
  );
}

export const CarCard = memo(Component);
