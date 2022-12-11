import { useEffect, useLayoutEffect, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

import { observer } from 'mobx-react-lite';

import { Spacer, Button } from '@components/common';
import { FormImagePicker, FormSelector, FormTextInput } from '@components/form';
import { useCarForm } from '@utils/hooks/form';
import { getEngines, showMessage } from '@utils/helpers';
import { useStore } from '@store';

import { Field, fields } from './config';
import { useStyles } from './styles';

const engines = getEngines();

function Component() {
  const { setOptions } = useNavigation();
  const { width } = useWindowDimensions();

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
      case 'engine_volume': {
        const options =
          name === 'engine_volume'
            ? engines
            : manufacturers.map(({ id, title }) => ({ label: title, value: id }));
        return (
          <FormSelector
            name={name}
            control={control}
            options={options}
            error={errors[name]}
            containerStyle={styles.field}
            {...rest}
          />
        );
      }
      default:
        return (
          <FormTextInput
            name={name}
            control={control}
            error={errors[name]}
            containerStyle={styles.field}
            {...rest}
          />
        );
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

  const numColumns = width > 700 ? 2 : 1;

  return (
    <View style={styles.container}>
      <KeyboardAwareFlatList
        data={fields}
        key={numColumns}
        numColumns={numColumns}
        renderItem={renderField}
        removeClippedSubviews={false}
        ListHeaderComponent={getHeader}
        ListFooterComponent={
          <>
            {getSeparator()}
            <FormImagePicker control={control} name={'car_photos'} error={errors['car_photos']} />
          </>
        }
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={getSeparator}
        columnWrapperStyle={numColumns > 1 && styles.columnWrapper}
      />
      <Spacer vertical={'s'} />
      <Button label="Submit" onPress={submit} loading={isLoading} />
    </View>
  );
}

export const CarFormScreen = observer(Component);
