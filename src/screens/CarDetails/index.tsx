import { useEffect, useMemo, useState } from 'react';
import { Platform, ScrollView, StyleProp, View, ViewStyle } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { observer } from 'mobx-react-lite';

import { Button, IconButton, Paper, Spacer, Spinner, Typography } from '@components/common';
import { RouteNames, RouteParams } from '@navigation';
import { dateToLocal } from '@utils/helpers';
import { Reviewer } from '@models';
import { useStore } from '@store';

import { ReviewersModal } from './ReviewersModal';
import { ImageList } from './ImageList';
import { useStyles } from './styles';
import { theme } from '@utils/constants';

function Component() {
  const { params } = useRoute<RouteParams<RouteNames.car>>();
  const { carId } = params;

  const { goBack, navigate } = useNavigation();

  const styles = useStyles();

  const { carsStore, userStore, chatsStore } = useStore();
  const { chats, getUserChats } = chatsStore;
  const { user, reviewers, getReviewers } = userStore;
  const { car, getCar, setCar, toggleFavorite } = carsStore;

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(!!car?.is_favourite);

  useEffect(() => {
    getUserChats();
    getReviewers();
    return () => {
      setCar(null);
    };
  }, []);

  const availableReviewers = useMemo(() => {
    const takenReviewers = chats.map(({ other_user }) => other_user.username);
    return reviewers.filter((reviewer) => !takenReviewers.includes(reviewer.username));
  }, [chats, reviewers]);

  useEffect(() => {
    setIsLoading(true);
    getCar(carId).finally(() => setIsLoading(false));
  }, [carId]);

  if (isLoading || !car) return <Spinner />;

  const onReviewerPressed = (reviewer: Reviewer) => {
    setIsModalVisible(false);
    user &&
      navigate(RouteNames.chat, { carId, sender: user.username, recipient: reviewer.username });
  };

  const getHeader = (style: StyleProp<ViewStyle>) => {
    return (
      <View style={[styles.header, style]}>
        <IconButton icon={{ set: 'AntDesign', name: 'arrowleft', size: 25 }} onPress={goBack} />
        <IconButton
          icon={{
            set: 'FontAwesome',
            name: isFavorite ? 'star' : 'star-o',
            size: 25,
            color: theme.colors.gold,
          }}
          onPress={() => toggleFavorite(car).then(setIsFavorite.bind(null, !isFavorite))}
          iconStyle={{ color: theme.colors.gold }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Platform.OS !== 'web' && getHeader(styles.mobileHeader)}
      <ScrollView>
        {Platform.OS === 'web' && getHeader(styles.webHeader)}
        <View style={styles.body}>
          <ImageList images={car.car_photos} style={styles.images} />
          <View style={styles.info}>
            <Paper>
              <View style={styles.spacedRow}>
                <View style={styles.row}>
                  <Typography text={car.manufacturer_name} style={styles.title} />
                  <Spacer horizontal={'xs'} />
                  <Typography text={car.model} style={styles.title} />
                </View>
                <Typography text={`${car.price} $`} style={styles.title} />
              </View>
              <Spacer vertical={'xs'} />
              <Typography text={`${car.engine_volume} ml, ${car.hp} hp, ${car.color}`} />
            </Paper>
            <Spacer vertical={'s'} />
            <Paper>
              <Typography text={'VIN'} style={styles.title} />
              <Typography text={car.vin} />
            </Paper>
            <Spacer vertical={'s'} />
            <Paper>
              <Typography text={'Created'} style={styles.title} />
              <Typography text={dateToLocal(car.created_at)} />
            </Paper>
            <Spacer vertical={'s'} />
            <Paper>
              <Typography text={'Updated'} style={styles.title} />
              <Typography text={dateToLocal(car.updated_at)} />
            </Paper>
          </View>
        </View>
        <Spacer vertical={'xxl'} />
      </ScrollView>
      <Button
        label="Contact reviewer"
        onPress={setIsModalVisible.bind(null, true)}
        style={styles.button}
      />
      <ReviewersModal
        visible={isModalVisible}
        reviewers={availableReviewers}
        setVisible={setIsModalVisible}
        onReviewerPressed={onReviewerPressed}
      />
    </View>
  );
}

export const CarDetailsScreen = observer(Component);
