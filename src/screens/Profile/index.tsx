import { Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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
import { removePersistedData } from '@utils/helpers';
import { useStore } from '@store';

import { useStyles } from './styles';
import { EditUserModal } from '@screens';
import { useState } from 'react';

export function ProfileScreen() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { userStore } = useStore();
  const { clear } = userStore;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const goTo = (screen: string) => {
    navigate(screen);
  };

  const goToEdit = () => {
    Platform.OS === 'web' ? setIsModalVisible(true) : goTo(RouteNames.editUser);
  };

  const logOut = () => {
    removePersistedData('user');
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
        <TouchableOpacity style={styles.menuItem} onPress={goTo.bind(null, RouteNames.carForm)}>
          <Typography text={'Create Car Post'} />
          <Icon set={'Feather'} name={'chevron-right'} size={20} />
        </TouchableOpacity>
      </Paper>
      <Spacer vertical={'m'} />
      <Paper>
        <TouchableOpacity style={styles.menuItem} onPress={goToEdit}>
          <Typography text={'Edit info'} />
          <Icon set={'Feather'} name={'chevron-right'} size={20} />
        </TouchableOpacity>
      </Paper>
      <Spacer flex />
      <Button label="Log out" onPress={logOut} />
      {Platform.OS === 'web' && (
        <EditUserModal visible={isModalVisible} setVisible={setIsModalVisible} />
      )}
    </ScreenContainer>
  );
}
