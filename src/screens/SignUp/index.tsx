import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSignUpForm } from 'miniva-common';

import { RouteNames } from '@navigation';
import { Typography, Spacer, Button, KeyboardContainer, ScreenContainer } from '@components/common';
import { FormTextInput } from '@components/form';

import { useStyles } from './styles';
import { useScreenEnter } from '@utils/hooks';

export function SignUpScreen() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { control, errors, onSubmit, reset } = useSignUpForm();

  const [isLoading, setIsLoading] = useState(false);

  useScreenEnter(() => reset, []);

  const goToSignIn = () => {
    navigate(RouteNames.signIn);
  };

  const signUp = onSubmit(() => {
    Keyboard.dismiss();
    setIsLoading(true);
    setTimeout(() => {
      navigate(RouteNames.root, { screen: RouteNames.cars });
      setIsLoading(false);
    }, 1500);
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
          <Button label="Sign Up" onPress={signUp} loading={isLoading} />
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
