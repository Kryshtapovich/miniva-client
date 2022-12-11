import { View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { Button, Spacer, Typography } from '@components/common';
import { FormSelector, FormTextInput } from '@components/form';
import { useCarFilter } from '@utils/hooks/form';
import { useScreenEnter } from '@utils/hooks';
import { useStore } from '@store';

import { useStyles } from './styles';
import { getEngines } from '@utils/helpers';

interface Props {
  onFilter: () => void;
}

const engines = getEngines();

function Component(props: Props) {
  const { onFilter } = props;

  const { manufacturersStore, carsStore } = useStore();
  const { filter, filterCars } = carsStore;
  const { getAll, manufacturers } = manufacturersStore;

  useScreenEnter(() => {
    getAll();
  }, []);

  const styles = useStyles();

  const { control, onSubmit } = useCarFilter(filter);

  const options = manufacturers.map(({ id, title }) => ({ label: title, value: id }));

  const onFilterPressed = onSubmit((data) => {
    filterCars(data);
    onFilter();
  });

  return (
    <>
      <FormSelector
        name={'manufacturer'}
        label={'Manufacturer'}
        control={control}
        options={options}
      />
      <Spacer vertical={'s'} />
      <FormTextInput name={'model'} label={'Model'} control={control} />
      <Spacer vertical={'s'} />
      <View>
        <Typography text="Power" />
        <Spacer vertical={'xs'} />
        <View style={styles.row}>
          <View style={styles.rowPart}>
            <FormTextInput
              name={'hp_lt'}
              control={control}
              placeholder={'From'}
              keyboardType={'numeric'}
            />
          </View>
          <Spacer horizontal={'s'} />
          <View style={styles.rowPart}>
            <FormTextInput
              name={'hp_gt'}
              control={control}
              placeholder={'To'}
              keyboardType={'numeric'}
            />
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
              options={engines}
              control={control}
              placeholder={'From'}
              name={'engine_volume_lt'}
            />
          </View>
          <Spacer horizontal={'s'} />
          <View style={styles.rowPart}>
            <FormSelector
              options={engines}
              control={control}
              placeholder={'To'}
              name={'engine_volume_gt'}
            />
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
              control={control}
              name={'price_lt'}
              placeholder={'From'}
              keyboardType={'numeric'}
            />
          </View>
          <Spacer horizontal={'s'} />
          <View style={styles.rowPart}>
            <FormTextInput
              control={control}
              name={'price_gt'}
              placeholder={'To'}
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </View>
      <Spacer flex vertical={'s'} />
      <Button label="Filter" onPress={onFilterPressed} />
    </>
  );
}

export const CarFilterContent = observer(Component);
