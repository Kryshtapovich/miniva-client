import { PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ModalProps extends PropsWithChildren {
  visible: boolean;
  setVisible: (value: boolean) => void;
  contentStyle?: StyleProp<ViewStyle>;
}

export type Params = () => { Modal: (props: ModalProps) => JSX.Element };
