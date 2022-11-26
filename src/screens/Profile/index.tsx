import { TouchableOpacity } from 'react-native';

import { useStore } from 'miniva-common';

import {
  Button,
  Divider,
  Icon,
  Paper,
  ScreenContainer,
  Spacer,
  Typography,
} from '@components/common';
import { removeToken } from '@utils/helpers';

import { useStyles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RouteNames } from '@navigation';

export function ProfileScreen() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { userStore } = useStore();
  const { signOut } = userStore;

  const goToCarForm = () => {
    navigate(RouteNames.carForm);
  };

  const logOut = () => {
    signOut();
    removeToken();
    navigate(RouteNames.signIn);
  };

  return (
    <ScreenContainer>
      <Paper>
        <TouchableOpacity style={styles.menuItem}>
          <Typography text={'My Posts'} />
          <Icon set={'Feather'} name={'chevron-right'} size={20} />
        </TouchableOpacity>
        <Divider vertical={'m'} />
        <TouchableOpacity style={styles.menuItem} onPress={goToCarForm}>
          <Typography text={'Create Car Post'} />
          <Icon set={'Feather'} name={'chevron-right'} size={20} />
        </TouchableOpacity>
      </Paper>
      <Spacer flex />
      <Button label="Log out" onPress={logOut} />
    </ScreenContainer>
  );
}
