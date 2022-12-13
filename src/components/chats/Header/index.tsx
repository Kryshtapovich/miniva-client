import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Car } from '@models';
import { RouteNames } from '@navigation';
import { IconButton, Spacer, Typography } from '@components/common';

import { useStyles } from './styles';

interface Props {
  car: Car;
}

export function ChatHeader(props: Props) {
  const { car } = props;
  const { manufacturer_name, model } = car;

  const { goBack, navigate } = useNavigation();

  const goToCar = () => {
    navigate(RouteNames.car, { carId: car.id });
  };

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <IconButton
        icon={{ set: 'Feather', name: 'chevron-left', size: 25 }}
        onPress={goBack}
        style={styles.button}
      />
      <Pressable style={styles.car} onPress={goToCar}>
        <Typography text={manufacturer_name} style={styles.text} />
        <Spacer horizontal={'xs'} />
        <Typography text={model} style={styles.text} />
      </Pressable>
    </View>
  );
}
