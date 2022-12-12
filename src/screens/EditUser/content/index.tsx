import { useEffect } from 'react';
import { View } from 'react-native';

import { observer } from 'mobx-react-lite';

import { Button, Spacer, Typography } from '@components/common';
import { FormTextInput } from '@components/form';
import { useEditUser } from '@utils/hooks/form';
import { showMessage } from '@utils/helpers';
import { useStore } from '@store';

interface Props {
  onSubmit: () => void;
}

function Component(props: Props) {
  const { onSubmit: submitCallback } = props;

  const { userStore } = useStore();
  const { user, loading, editUser, errors: storeErrors, clearErrors } = userStore;

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const { control, errors: formErrors, onSubmit } = useEditUser(user);

  const submit = onSubmit(async (data) => {
    const { username, email, password } = data;
    try {
      await editUser(username, email, password);
      submitCallback();
      showMessage({ type: 'success', message: 'User data has been successfully updated' });
    } catch {
      showMessage({ type: 'error', message: 'An error occured while updating data' });
    }
  });

  return (
    <>
      <FormTextInput
        control={control}
        name={'username'}
        label={'Username'}
        error={formErrors.username}
      />
      <Spacer vertical={'s'} />
      <FormTextInput
        name={'email'}
        label={'Email'}
        control={control}
        error={formErrors.email}
        keyboardType={'email-address'}
      />
      <Spacer vertical={'s'} />
      <FormTextInput
        password
        control={control}
        name={'password'}
        label={'Password'}
        error={formErrors.password}
      />
      <Spacer vertical={'s'} />
      <View>
        {storeErrors?.map((error, i) => (
          <Typography key={i} text={error} error />
        ))}
      </View>
      <Spacer flex vertical={'s'} />
      <Button label={'Submit'} loading={loading} onPress={submit} />
    </>
  );
}

export const EditUserContent = observer(Component);
