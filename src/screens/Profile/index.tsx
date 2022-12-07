import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
import { RouteNames } from '@navigation';
import { removeUser } from '@utils/helpers';

import { useStyles } from './styles';

export function ProfileScreen() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { userStore } = useStore();
  const { clear } = userStore;

  const goToCarForm = () => {
    navigate(RouteNames.carForm);
  };

  const logOut = () => {
    removeUser();
    clear();
  };

  return (
    <ScreenContainer containerStyle={styles.container}>
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
