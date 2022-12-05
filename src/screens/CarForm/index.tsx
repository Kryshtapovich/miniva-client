import { useEffect, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import { observer, useCarForm, useStore } from 'miniva-common';

import { Spacer, Button } from '@components/common';
import { FormImagePicker, FormSelector, FormTextInput } from '@components/form';
import { showMessage } from '@utils/helpers';

import { Field, fields } from './config';
import { useStyles } from './styles';

const engines = Array.from({ length: 84 }, (_, i) => {
  const value = i / 10 + 0.7;
  return { label: value.toFixed(1), value };
});

function Component() {
  const { setOptions } = useNavigation();

  const { control, onSubmit, errors, reset } = useCarForm();
  const styles = useStyles();

  const [isLoading, setIsLoading] = useState(false);
  const { goBack } = useNavigation();

  const { carsStore, manufacturersStore } = useStore();
  const { createCar } = carsStore;
  const { getAll, manufacturers, clear } = manufacturersStore;

  useEffect(() => {
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

  const renderField = ({ item }: { item: Field }) => {
    const { name, ...rest } = item;
    switch (name) {
      case 'manufacturer':
      case 'engine': {
        const options =
          name === 'engine'
            ? engines
            : manufacturers.map(({ id, title }) => ({ label: title, value: id }));
        return (
          <FormSelector
            name={name}
            control={control}
            options={options}
            error={errors[name]}
            {...rest}
          />
        );
      }
      case 'car_photos': {
        return <FormImagePicker control={control} name={name} error={errors[name]} />;
      }
      default:
        return <FormTextInput name={name} control={control} error={errors[name]} {...rest} />;
    }
  };

  const getHeader = () => {
    return <Spacer top={'xl'} />;
  };

  const getSeparator = () => {
    return <Spacer vertical={'s'} />;
  };

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
    <View style={styles.container}>
      <KeyboardAwareFlatList
        data={fields}
        renderItem={renderField}
        removeClippedSubviews={false}
        ListHeaderComponent={getHeader}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={getSeparator}
      />
      <Spacer vertical={'s'} />
      <Button label="Submit" onPress={submit} loading={isLoading} />
    </View>
  );
}

export const CarFormScreen = observer(Component);
