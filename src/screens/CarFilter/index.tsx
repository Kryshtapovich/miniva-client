import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useCarForm } from 'miniva-common';

import {
  Button,
  Icon,
  KeyboardContainer,
  ScreenContainer,
  Spacer,
  Typography,
} from '@components/common';
import { FormSelector, FormTextInput } from '@components/form';

import { useStyles } from './styles';

export function CarFilterScreen() {
  const styles = useStyles();

  const { control } = useCarForm();

  const { goBack } = useNavigation();

  return (
    <ScreenContainer>
      <KeyboardContainer>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={goBack}>
            <Icon set={'Feather'} name={'chevron-left'} size={25} />
          </Pressable>
          <Typography text="Reset all" onPress={Promise.resolve} style={styles.resetText} />
        </View>
        <Spacer vertical={'s'} />
        <FormSelector name={'manufacturer'} label={'Manufacturer'} control={control} options={[]} />
        <Spacer vertical={'s'} />
        <FormSelector
          name={'model'}
          label={'Model'}
          placeholder={'Choose manufacturer first'}
          control={control}
          options={[]}
        />
        <Spacer vertical={'s'} />
        <View>
          <Typography text="Power" />
          <Spacer vertical={'xs'} />
          <View style={styles.row}>
            <View style={styles.rowPart}>
              <FormSelector
                name={'power_from'}
                placeholder={'From'}
                control={control}
                options={[]}
              />
            </View>
            <Spacer horizontal={'s'} />
            <View style={styles.rowPart}>
              <FormSelector name={'power_to'} placeholder={'To'} control={control} options={[]} />
            </View>
          </View>
        </View>
        <Spacer vertical={'s'} />
        <View>
          <Typography text="Engine" />
          <Spacer vertical={'xs'} />
          <View style={styles.row}>
            <View style={styles.rowPart}>
              <FormSelector
                name={'engine_from'}
                placeholder={'From'}
                control={control}
                options={[]}
              />
            </View>
            <Spacer horizontal={'s'} />
            <View style={styles.rowPart}>
              <FormSelector name={'engine_to'} placeholder={'To'} control={control} options={[]} />
            </View>
          </View>
        </View>
        <Spacer vertical={'s'} />
        <View>
          <Typography text="Price" />
          <Spacer vertical={'xs'} />
          <View style={styles.row}>
            <View style={styles.rowPart}>
              <FormTextInput
                name={'price_from'}
                placeholder={'From'}
                control={control}
                keyboardType={'numeric'}
              />
            </View>
            <Spacer horizontal={'s'} />
            <View style={styles.rowPart}>
              <FormTextInput
                name={'price_to'}
                placeholder={'To'}
                control={control}
                keyboardType={'numeric'}
              />
            </View>
          </View>
        </View>
        <Spacer flex vertical={'s'} />
        <Button label="Filter" onPress={Promise.resolve} />
      </KeyboardContainer>
    </ScreenContainer>
  );
}
