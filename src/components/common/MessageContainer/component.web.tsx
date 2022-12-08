import { ToastContainer } from 'react-toastify';

export function MessageContainer() {
  return (
    <ToastContainer position={'top-right'} theme={'colored'} draggable={false} autoClose={2000} />
  );
}
