import { View } from 'react-native';

import { theme } from '@utils/constants';

type Spacing = keyof typeof theme.spacing | number;

interface Props {
  flex?: boolean;
  top?: Spacing;
  bottom?: Spacing;
  left?: Spacing;
  right?: Spacing;
  vertical?: Spacing;
  horizontal?: Spacing;
}

const getSpace = (item?: Spacing) => {
  if (!item) return undefined;
  return typeof item === 'number' ? item : theme.spacing[item];
};

export function Spacer(props: Props) {
  const { flex, top, bottom, left, right, vertical, horizontal } = props;

  const style = {
    flex: flex ? 1 : undefined,
    marginTop: getSpace(top),
    marginBottom: getSpace(bottom),
    marginLeft: getSpace(left),
    marginRight: getSpace(right),
    marginVertical: getSpace(vertical),
    marginHorizontal: getSpace(horizontal),
  };

  return <View style={style} />;
}
