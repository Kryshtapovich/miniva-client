import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer, useSignUpForm, useStore } from 'miniva-common';

import { RouteNames } from '@navigation';
import { Typography, Spacer, Button, KeyboardContainer, ScreenContainer } from '@components/common';
import { FormTextInput } from '@components/form';

import { useScreenEnter } from '@utils/hooks';
import { setToken } from '@utils/helpers';

import { useStyles } from './styles';

function Component() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { control, errors, onSubmit, reset } = useSignUpForm();

  const { userStore } = useStore();
  const { signUp, loading } = userStore;

  useScreenEnter(() => reset, []);

  const goToSignIn = () => {
    navigate(RouteNames.signIn);
  };

  const submit = onSubmit(async (data) => {
    Keyboard.dismiss();
    const { username, email, password } = data;
    const token = await signUp(username, email, password);
    if (token) {
      setToken(token);
      navigate(RouteNames.root, { screen: RouteNames.cars });
    }
  });

  return (
    <ScreenContainer>
      <KeyboardContainer style={styles.content}>
        <Spacer flex />
        <Typography text="Miniva" style={styles.title} />
        <Spacer vertical={'m'} />
        <View style={styles.form}>
          <FormTextInput
            name="username"
            label="Username"
            control={control}
            error={errors.username}
          />
          <Spacer vertical={'s'} />
          <FormTextInput name="email" label="Email" control={control} error={errors.email} />
          <Spacer vertical={'s'} />
          <FormTextInput
            name="password"
            label="Password"
            control={control}
            error={errors.password}
          />
          <Spacer vertical={'l'} />
          <Button label="Sign Up" onPress={submit} loading={loading} />
        </View>
        <Spacer flex />
        <View style={styles.footer}>
          <Typography text="Already have an account?" />
          <Spacer horizontal={'xs'} />
          <Typography text="Sign In" onPress={goToSignIn} style={styles.signUp} />
        </View>
      </KeyboardContainer>
    </ScreenContainer>
  );
}

export const SignUpScreen = observer(Component);
