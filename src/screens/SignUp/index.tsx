import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { Typography, Spacer, Button, KeyboardContainer, ScreenContainer } from '@components/common';
import { FormTextInput } from '@components/form';
import { useSignUpForm } from '@utils/hooks/form';
import { useScreenEnter } from '@utils/hooks';
import { setUser } from '@utils/helpers';
import { RouteNames } from '@navigation';
import { useStore } from '@store';

import { useStyles } from './styles';

function Component() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { control, errors: formErrors, onSubmit, reset } = useSignUpForm();

  const { userStore } = useStore();
  const { signUp, loading, errors: storeErrors, clear } = userStore;

  useScreenEnter(() => reset, []);

  const goToSignIn = () => {
    clear();
    navigate(RouteNames.signIn);
  };

  const submit = onSubmit(async (data) => {
    Keyboard.dismiss();
    const { username, email, password } = data;
    const user = await signUp(username, email, password);
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
            name="username"
            label="Username"
            control={control}
            error={formErrors.username}
          />
          <Spacer vertical={'s'} />
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
