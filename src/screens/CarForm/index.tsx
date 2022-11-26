import { observer, useCarForm, useStore } from 'miniva-common';

import { Button, KeyboardContainer, ScreenContainer, Spacer } from '@components/common';
import { useScreenEnter } from '@utils/hooks';

import { useStyles } from './styles';
import { FormSelector, FormTextInput } from '@components/form';

function Component() {
  const { manufacturersStore } = useStore();
  const { getAll, manufacturers, clear } = manufacturersStore;

  const styles = useStyles();

  const { control, onSubmit, errors } = useCarForm();

  useScreenEnter(() => {
    getAll();
    return clear;
  }, []);

  const submit = onSubmit((data) => {
    console.log(data);
  });

  return (
    <ScreenContainer>
      <KeyboardContainer scrollEnabled>
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
        <Button label="Submit" onPress={submit} />
      </KeyboardContainer>
    </ScreenContainer>
  );
}

export const CarFormScreen = observer(Component);
