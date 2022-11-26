import { StyleProp, TextStyle } from 'react-native';
import Select, { PickerStyle } from 'react-native-picker-select';

import { Icon } from '../Icon';
import { useStyles } from './styles';

interface Props {
  onChange: (value: number) => void;
  options: Array<{ label: string; value: number }>;
  style?: PickerStyle & { icon: StyleProp<TextStyle> };
}

export function Selector(props: Props) {
  const { onChange, options, style } = props;

  const styles = useStyles();

  const onValueChange = (value: number) => {
    onChange(value);
  };

  const renderIcon = () => {
    return (
      <Icon set={'Feather'} name={'chevron-down'} size={25} style={[styles.icon, style?.icon]} />
    );
  };

  return (
    <Select
      onValueChange={onValueChange}
      items={options}
      useNativeAndroidPickerStyle={false}
      style={{
        inputIOS: { ...styles.container, ...style?.inputIOS },
        inputAndroid: { ...styles.container, ...style?.inputAndroid },
        iconContainer: {
          ...styles.iconContainer,
          ...style?.iconContainer,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
      Icon={renderIcon}
    />
  );
}