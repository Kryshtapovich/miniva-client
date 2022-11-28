import { useState } from 'react';
import { Pressable, TextInput as RNTextInput, TextInputProps, View } from 'react-native';

import { Icon } from '../Icon';
import { useStyles } from './styles';

interface Props extends TextInputProps {
  password?: boolean;
}

export function TextInput(props: Props) {
  const { style, password, ...rest } = props;
  const [passwordShown, setPasswordShown] = useState(!password);
  const styles = useStyles();

  return (
    <View>
      <RNTextInput
        autoCapitalize={'none'}
        {...rest}
        style={[styles.container, style]}
        secureTextEntry={!passwordShown}
        maxLength={26}
      />
      <Pressable
        hitSlop={20}
        onPress={setPasswordShown.bind(null, !passwordShown)}
        style={[styles.iconContainer, !password && styles.hidden]}
      >
        <Icon set={'Feather'} name={passwordShown ? 'eye' : 'eye-off'} size={25} />
      </Pressable>
    </View>
  );
}
