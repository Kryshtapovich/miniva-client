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

import { useStyles } from './styles';

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
  const { set, style, ...rest } = props;

  const styles = useStyles();

  const iconProps = { ...rest, style: [styles.icon, style] };

  switch (set) {
    case 'AntDesign':
      return <AntDesignIcon {...iconProps} />;
    case 'Entypo':
      return <EntypoIcon {...iconProps} />;
    case 'EvilIcons':
      return <EvilIcon {...iconProps} />;
    case 'Feather':
      return <FeatherIcon {...iconProps} />;
    case 'FontAwesome':
      return <FontAwesomeIcon {...iconProps} />;
    case 'FontAwesome5':
      return <FontAwesome5Icon {...iconProps} />;
    case 'FontAwesome5Pro':
      return <FontAwesome5ProIcon {...iconProps} />;
    case 'Foundation':
      return <FoundationIcon {...iconProps} />;
    case 'Ionicons':
      return <IonicIcon {...iconProps} />;
    case 'MaterialIcons':
      return <MaterialIcon {...iconProps} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcon {...iconProps} />;
    case 'Octicons':
      return <OctIcon {...iconProps} />;
    case 'SimpleLineIcons':
      return <SimpleLineIcon {...iconProps} />;
    case 'Zocial':
      return <ZocialIcon {...iconProps} />;
    default:
      return null;
  }
}
