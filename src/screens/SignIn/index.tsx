import { useState } from 'react';
import { Keyboard, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSignInForm } from 'miniva-common';

import { RouteNames } from '@navigation';
import { Typography, Spacer, Button, KeyboardContainer, ScreenContainer } from '@components/common';
import { FormTextInput } from '@components/form';
import { useScreenEnter } from '@utils/hooks';

import { useStyles } from './styles';

export function SignInScreen() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { control, errors, onSubmit, reset } = useSignInForm();

  const [isLoading, setIsLoading] = useState(false);

  useScreenEnter(() => reset, []);

  const goToSignUp = () => {
    navigate(RouteNames.signUp);
  };

  const signIn = onSubmit(() => {
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
          <FormTextInput name="email" label="Email" control={control} error={errors.email} />
          <Spacer vertical={'s'} />
          <FormTextInput
            name="password"
            label="Password"
            control={control}
            error={errors.password}
          />
          <Spacer vertical={'l'} />
          <Button label="Sign In" onPress={signIn} loading={isLoading} />
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
