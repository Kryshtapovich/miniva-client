import { View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { Spacer, Typography } from '@components/common';
import { FormSelector, FormTextInput } from '@components/form';
import { useCarForm } from '@utils/hooks/form';
import { useScreenEnter } from '@utils/hooks';
import { useStore } from '@store';

import { useStyles } from './styles';

function Component() {
  const { manufacturersStore } = useStore();
  const { getAll, manufacturers } = manufacturersStore;

  useScreenEnter(() => {
    getAll();
  }, []);

  const styles = useStyles();

  const { control } = useCarForm();

  const options = manufacturers.map(({ id, title }) => ({ label: title, value: id }));

  return (
    <>
      <FormSelector
        name={'manufacturer'}
        label={'Manufacturer'}
        control={control}
        options={options}
      />
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
            <FormSelector name={'power_from'} placeholder={'From'} control={control} options={[]} />
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
    </>
  );
}

export const CarFilterContent = observer(Component);
