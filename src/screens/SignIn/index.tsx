import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer, useSignInForm, useStore } from 'miniva-common';

import { RouteNames } from '@navigation';
import { Typography, Spacer, Button, KeyboardContainer, ScreenContainer } from '@components/common';
import { FormTextInput } from '@components/form';

import { useScreenEnter } from '@utils/hooks';
import { setToken } from '@utils/helpers';

import { useStyles } from './styles';

function Component() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { control, errors, onSubmit, reset } = useSignInForm();

  const [isLoading, setIsLoading] = useState(false);

  const { userStore } = useStore();
  const { signIn } = userStore;

  useScreenEnter(() => reset, []);

  const goToSignUp = () => {
    navigate(RouteNames.signUp);
  };

  const submit = onSubmit(async (data) => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const { email, password } = data;
      const token = await signIn(email, password);
      setToken(token);
      navigate(RouteNames.root, { screen: RouteNames.cars });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <ScreenContainer>
      <KeyboardContainer style={styles.content}>
        <Spacer flex />
        <Typography text="Miniva" style={styles.title} />
        <Spacer vertical={'m'} />
        <View style={styles.form}>
          <FormTextInput name="email" label="Email" control={control} error={errors.email} />
          <Spacer vertical={'s'} />
          <FormTextInput
            name="password"
            label="Password"
            control={control}
            error={errors.password}
          />
          <Spacer vertical={'l'} />
          <Button label="Sign In" onPress={submit} loading={isLoading} />
        </View>
        <Spacer flex />
        <View style={styles.footer}>
          <Typography text="Don't have an account?" />
          <Spacer horizontal={'xs'} />
          <Typography text="Sign Up" onPress={goToSignUp} style={styles.signUp} />
        </View>
      </KeyboardContainer>
    </ScreenContainer>
  );
}

export const SignInScreen = observer(Component);
