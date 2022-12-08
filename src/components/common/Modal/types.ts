import { PropsWithChildren } from 'react';

export interface ModalProps extends PropsWithChildren {
  visible: boolean;
  setVisible: (value: boolean) => void;
}

export type Params = () => { Modal: (props: ModalProps) => JSX.Element };
