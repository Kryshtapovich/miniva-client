import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { observer, useCarForm, useStore } from 'miniva-common';

import {
  Spacer,
  Button,
  ImagePicker,
  KeyboardContainer,
  ScreenContainer,
} from '@components/common';
import { useScreenEnter } from '@utils/hooks';

import { useStyles } from './styles';
import { FormSelector, FormTextInput } from '@components/form';

function Component() {
  const { setOptions } = useNavigation();
  const [photos, setPhotos] = useState<Array<string>>([]);

  const { control, onSubmit, errors, reset } = useCarForm();
  const styles = useStyles();

  const { manufacturersStore } = useStore();
  const { getAll, manufacturers, clear } = manufacturersStore;

  useScreenEnter(() => {
    getAll();

    return () => {
      clear();
      reset();
      setPhotos([]);
    };
  }, []);

  useLayoutEffect(() => {
    setOptions({
      headerTransparent: true,
      headerStyle: { marginBottom: 16 },
    });
  }, []);

  const addPhoto = (photo: string) => {
    setPhotos((arr) => [...arr, photo]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
  };

  const submit = onSubmit((data) => {
    console.log(data);
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
        <ImagePicker photos={photos} onAdd={addPhoto} onRemove={removePhoto} />
        <Spacer vertical={'s'} />
        <Button label="Submit" onPress={submit} />
      </KeyboardContainer>
    </ScreenContainer>
  );
}

export const CarFormScreen = observer(Component);
