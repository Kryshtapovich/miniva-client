import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { observer, useCarForm, useStore } from 'miniva-common';

import { Spacer, Button, KeyboardContainer, ScreenContainer } from '@components/common';
import { FormImagePicker, FormSelector, FormTextInput } from '@components/form';
import { useScreenEnter } from '@utils/hooks';
import { showMessage } from '@utils/helpers';

import { useStyles } from './styles';

function Component() {
  const { setOptions } = useNavigation();

  const { control, onSubmit, errors, reset } = useCarForm();
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const { goBack } = useNavigation();

  const { carsStore, manufacturersStore } = useStore();
  const { createCar } = carsStore;
  const { getAll, manufacturers, clear } = manufacturersStore;

  useScreenEnter(() => {
    getAll();

    return () => {
      clear();
      reset();
    };
  }, []);

  useLayoutEffect(() => {
    setOptions({
      headerTransparent: true,
      headerStyle: styles.header,
    });
  }, []);

  const submit = onSubmit(async (data) => {
    setIsLoading(true);
    try {
      await createCar(data);
      showMessage({ type: 'success', message: 'Car has been successfully createed' });
      goBack();
    } catch {
      showMessage({ type: 'error', message: 'An error occured while creating car' });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <ScreenContainer contentStyle={styles.container}>
      <KeyboardContainer scrollEnabled showScrollBar>
        <FormSelector
          control={control}
          name={'manufacturer'}
          label={'Manufacturer'}
          error={errors.manufacturer}
          options={manufacturers.map(({ id, title }) => ({ label: title, value: id }))}
        />
        <Spacer vertical={'s'} />
        <FormTextInput control={control} name={'model'} label={'Model'} error={errors.model} />
        <Spacer vertical={'s'} />
        <FormTextInput control={control} name={'color'} label={'Color'} error={errors.color} />
        <Spacer vertical={'s'} />
        <FormTextInput control={control} name={'vin'} label={'VIN'} error={errors.vin} />
        <Spacer vertical={'s'} />
        <FormTextInput
          control={control}
          name={'hp'}
          label={'Power'}
          error={errors.hp}
          keyboardType={'number-pad'}
        />
        <Spacer vertical={'s'} />
        <FormTextInput control={control} name={'engine'} label={'Engine'} error={errors.engine} />
        <Spacer vertical={'s'} />
        <FormTextInput
          control={control}
          name={'carcase'}
          label={'Carcase'}
          error={errors.carcase}
        />
        <Spacer vertical={'s'} />
        <FormTextInput
          control={control}
          name={'price'}
          label={'Price'}
          error={errors.price}
          keyboardType={'number-pad'}
        />
        <Spacer vertical={'s'} />
        <FormImagePicker control={control} name={'car_photos'} error={errors.car_photos} />
        <Spacer vertical={'s'} />
        <Button label="Submit" onPress={submit} loading={isLoading} />
      </KeyboardContainer>
    </ScreenContainer>
  );
}

export const CarFormScreen = observer(Component);
