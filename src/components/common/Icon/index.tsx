import { StyleProp, TextStyle } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5ProIcon from 'react-native-vector-icons/FontAwesome5Pro';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OctIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

const iconSets = {
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Feather: 'Feather',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  FontAwesome5Pro: 'FontAwesome5Pro',
  Foundation: 'Foundation',
  Ionicons: 'Ionicons',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Octicons: 'Octicons',
  Zocial: 'Zocial',
  SimpleLineIcons: 'SimpleLineIcons',
  AntDesign: 'AntDesign',
};

interface Props {
  set: keyof typeof iconSets;
  name: string;
  size: number;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export function Icon(props: Props) {
  const { set, ...rest } = props;
  switch (set) {
    case 'AntDesign':
      return <AntDesignIcon {...rest} />;
    case 'Entypo':
      return <EntypoIcon {...rest} />;
    case 'EvilIcons':
      return <EvilIcon {...rest} />;
    case 'Feather':
      return <FeatherIcon {...rest} />;
    case 'FontAwesome':
      return <FontAwesomeIcon {...rest} />;
    case 'FontAwesome5':
      return <FontAwesome5Icon {...rest} />;
    case 'FontAwesome5Pro':
      return <FontAwesome5ProIcon {...rest} />;
    case 'Foundation':
      return <FoundationIcon {...rest} />;
    case 'Ionicons':
      return <IonicIcon {...rest} />;
    case 'MaterialIcons':
      return <MaterialIcon {...rest} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcon {...rest} />;
    case 'Octicons':
      return <OctIcon {...rest} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcon {...rest} />;
    case 'Zocial':
      return <ZocialIcon {...rest} />;
    default:
      return null;
  }
}
