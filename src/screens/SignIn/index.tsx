import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer, useSignInForm, useStore } from 'miniva-common';

import { RouteNames } from '@navigation';
import { Typography, Spacer, Button, ScreenContainer, KeyboardContainer } from '@components/common';
import { FormTextInput } from '@components/form';

import { useScreenEnter } from '@utils/hooks';
import { setUser } from '@utils/helpers';

import { useStyles } from './styles';

function Component() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { control, errors: formErrors, onSubmit, reset } = useSignInForm();

  const { userStore } = useStore();
  const { signIn, loading, errors: storeErrors, clear } = userStore;

  useScreenEnter(() => reset, []);

  const goToSignUp = () => {
    clear();
    navigate(RouteNames.signUp);
  };

  const submit = onSubmit(async (data) => {
    Keyboard.dismiss();
    const { email, password } = data;
    const user = await signIn(email, password).catch(console.log);
    user && setUser(user);
  });

  return (
    <ScreenContainer>
      <KeyboardContainer style={styles.content}>
        <Spacer flex />
        <Typography text="Miniva" style={styles.title} />
        <Spacer vertical={'m'} />
        <View style={styles.form}>
          <FormTextInput
            name="email"
            label="Email"
            control={control}
            error={formErrors.email}
            keyboardType={'email-address'}
          />
          <Spacer vertical={'s'} />
          <FormTextInput
            password
            name="password"
            label="Password"
            control={control}
            error={formErrors.password}
          />
          <Spacer vertical={'s'} />
          <View>
            {storeErrors?.map((error, i) => (
              <Typography key={i} text={error} error />
            ))}
          </View>
          <Spacer vertical={'s'} />
          <Button label="Sign In" onPress={submit} loading={loading} />
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
