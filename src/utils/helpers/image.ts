import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

type ChooseCallback = (images: Array<string>) => void;

export const chooseImages = async (multiple: boolean, onLoad: ChooseCallback) => {
  const { assets } = await launchImageLibrary({
    mediaType: 'photo',
    includeBase64: true,
    selectionLimit: multiple ? 0 : 1,
    quality: 0.5,
  });

  assets && onLoad(assets.map(({ base64 }) => 'data:image/png;base64,' + base64));
  // return assets ? assets.map(({ base64 }) => 'data:image/png;base64,' + base64) : [];
};

export const takePhoto = async (onLoad: ChooseCallback) => {
  const { assets } = await launchCamera({
    mediaType: 'photo',
    includeBase64: true,
    quality: 0.5,
  });

  assets && onLoad(assets.map(({ base64 }) => 'data:image/png;base64,' + base64));
};
