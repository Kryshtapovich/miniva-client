import { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import {
  Button,
  Divider,
  Icon,
  Paper,
  ScreenContainer,
  Spacer,
  Typography,
} from '@components/common';
import { useStore } from '@store';
import { UserRole } from '@models';
import { RouteNames } from '@navigation';
import { EditUserModal } from '@screens';
import { removePersistedData } from '@utils/helpers';

import { useStyles } from './styles';

function Component() {
  const styles = useStyles();
  const { navigate } = useNavigation();
  const { userStore } = useStore();
  const { user, clear } = userStore;

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
      {user?.role === UserRole.Customer && (
        <Paper>
          {/* <TouchableOpacity style={styles.menuItem} onPress={() => navigate(RouteNames.chat)}>
            <Typography text={'My Posts'} />
            <Icon set={'Feather'} name={'chevron-right'} size={20} />
          </TouchableOpacity>
          <Divider vertical={'m'} /> */}
          <TouchableOpacity style={styles.menuItem} onPress={goTo.bind(null, RouteNames.carForm)}>
            <Typography text={'Create Car Post'} />
            <Icon set={'Feather'} name={'chevron-right'} size={20} />
          </TouchableOpacity>
        </Paper>
      )}
      <Spacer vertical={'s'} />
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

export const ProfileScreen = observer(Component);
