import { View } from 'react-native';

import { theme } from '@utils/constants';

type Spacing = keyof typeof theme.spacing | number;

interface Props {
  top?: Spacing;
  bottom?: Spacing;
  vertical?: Spacing;
}

const getSpace = (item?: Spacing) => {
  if (!item) return undefined;
  return typeof item === 'number' ? item : theme.spacing[item];
};

export function Divider(props: Props) {
  const { top, bottom, vertical } = props;

  const style = {
    height: 1,
    marginTop: getSpace(top),
    marginBottom: getSpace(bottom),
    marginVertical: getSpace(vertical),
    backgroundColor: theme.colors.lightGray,
  };

  return <View style={style} />;
}
