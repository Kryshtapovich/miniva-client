import { StyleProp, TextStyle } from 'react-native';
import Select, { PickerStyle } from 'react-native-picker-select';

import { Icon } from '../Icon';
import { useStyles } from './styles';

interface Props {
  placeholder?: string;
  onChange: (value: number) => void;
  options: Array<{ label: string; value: number }>;
  style?: PickerStyle & { icon: StyleProp<TextStyle> };
}

export function Selector(props: Props) {
  const { onChange, options, style, placeholder } = props;

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
      items={options}
      Icon={renderIcon as any}
      onValueChange={onValueChange}
      useNativeAndroidPickerStyle={false}
      placeholder={{ label: placeholder || ' ', value: '' }}
      style={{
        inputIOS: { ...styles.container, ...style?.inputIOS },
        inputAndroid: { ...styles.container, ...style?.inputAndroid },
        inputWeb: { ...styles.container, ...styles.inputWeb, ...style?.inputWeb },
        iconContainer: { ...styles.iconContainer, ...style?.iconContainer },
      }}
    />
  );
}
