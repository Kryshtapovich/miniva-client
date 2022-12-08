import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Button,
  IconButton,
  KeyboardContainer,
  ScreenContainer,
  Spacer,
  Typography,
} from '@components/common';

import { CarFilterContent } from '../content';
import { useStyles } from './styles';

export function CarFilterScreen() {
  const styles = useStyles();

  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <KeyboardContainer>
        <View style={styles.header}>
          <IconButton icon={{ set: 'Feather', name: 'chevron-left', size: 25 }} onPress={goBack} />
          <Typography text="Reset all" onPress={Promise.resolve} style={styles.resetText} />
        </View>
        <Spacer vertical={'s'} />
        <CarFilterContent />
        <Spacer flex vertical={'s'} />
        <Button label="Filter" onPress={Promise.resolve} />
      </KeyboardContainer>
    </ScreenContainer>
  );
}
