import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  IconButton,
  KeyboardContainer,
  ScreenContainer,
  Spacer,
  Typography,
} from '@components/common';
import { useStore } from '@store';

import { CarFilterContent } from '../content';
import { useStyles } from './styles';

export function CarFilterScreen() {
  const styles = useStyles();

  const { carsStore } = useStore();
  const { resetFilter } = carsStore;

  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <KeyboardContainer>
        <View style={styles.header}>
          <IconButton icon={{ set: 'Feather', name: 'chevron-left', size: 25 }} onPress={goBack} />
          <Typography text="Reset all" onPress={resetFilter} style={styles.resetText} />
        </View>
        <Spacer vertical={'s'} />
        <CarFilterContent onFilter={goBack} />
      </KeyboardContainer>
    </ScreenContainer>
  );
}
