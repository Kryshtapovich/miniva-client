export interface Params {
  type: 'success' | 'error';
  message: string;
}

export type Callback = () => { showMessage: (params: Params) => void };
