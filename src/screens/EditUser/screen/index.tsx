import { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { KeyboardContainer } from '@components/common';

import { EditUserContent } from '../content';
import { useStyles } from './styles';

export function EditUserScreen() {
  const { goBack, setOptions } = useNavigation();

  const styles = useStyles();

  useLayoutEffect(() => {
    setOptions({
      headerTransparent: true,
      headerStyle: styles.header,
    });
  }, []);

  return (
    <View style={styles.container}>
      <KeyboardContainer>
        <EditUserContent onSubmit={goBack} />
      </KeyboardContainer>
    </View>
  );
}
